import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { IAdvertQuery } from "../interfaces/IQuery";
import { ITokenPayload } from "../interfaces/IToken";
import { advertService } from "../services/advertService";
import { statisticService } from "../services/statisticService";

class AdvertController {
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body;
            const images = (req.files as Express.Multer.File[]).map(
                (file) => file.filename,
            );
            const advert = await advertService.create(userId, {
                ...dto,
                images,
            });
            res.status(StatusCodes.CREATED).json(advert);
        } catch (e) {
            next(e);
        }
    }
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IAdvertQuery;
            const adverts = await advertService.getAll(query);
            res.status(StatusCodes.OK).json(adverts);
        } catch (e) {
            next(e);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const advert = await advertService.getById(id);
            res.status(StatusCodes.OK).json(advert);
        } catch (e) {
            next(e);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, role } = res.locals.tokenPayload as ITokenPayload;
            const id = req.params.id as string;
            const dto = req.body;
            const images = (req.files as Express.Multer.File[]).map(
                (file) => file.filename,
            );
            const uniqImage = new Set(images);
            const removeImages = req.body.removeImages ?? [];
            const advert = await advertService.update(
                id,
                userId,
                { ...dto, uniqImage, removeImages },
                role,
            );
            res.status(StatusCodes.OK).json(advert);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, role } = res.locals.tokenPayload as ITokenPayload;
            const id = req.params.id as string;
            const advert = await advertService.delete(id, userId, role);
            res.status(StatusCodes.NO_CONTENT).json(advert);
        } catch (e) {
            next(e);
        }
    }
    public async getStatistics(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { userId } = res.locals.tokenPayload as ITokenPayload;
            const advertId = req.params.id as string;
            const statistics = await statisticService.getStatistics(
                advertId,
                userId,
            );
            res.status(StatusCodes.OK).json(statistics);
        } catch (e) {
            next(e);
        }
    }
}
export const advertController = new AdvertController();
