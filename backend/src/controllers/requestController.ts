import { NextFunction, Request, Response } from "express";

import { RequestAction } from "../enums/requestStatus";
import { StatusCodes } from "../enums/statusCodes";
import { ITokenPayload } from "../interfaces/IToken";
import { requestService } from "../services/requestService";

class RequestController {
    public async createBrandRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { userId } = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body;
            const request = await requestService.createBrandRequest(
                userId,
                dto,
            );
            res.status(StatusCodes.CREATED).json(request);
        } catch (e) {
            next(e);
        }
    }
    public async createModelRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { userId } = res.locals.tokenPayload as ITokenPayload;
            const dto = req.body;
            const request = await requestService.createModelRequest(
                userId,
                dto,
            );
            res.status(StatusCodes.CREATED).json(request);
        } catch (e) {
            next(e);
        }
    }
    public async getAllBrandRequests(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const requests = await requestService.getAllBrandRequests();
            res.status(StatusCodes.OK).json(requests);
        } catch (e) {
            next(e);
        }
    }
    public async getAllModelRequests(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const requests = await requestService.getAllModelRequests();
            res.status(StatusCodes.OK).json(requests);
        } catch (e) {
            next(e);
        }
    }

    public async changeBrandRequestStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id, action } = req.params as {
                id: string;
                action: RequestAction;
            };
            const request = await requestService.changeBrandRequestStatus(
                id,
                action,
            );
            res.status(StatusCodes.OK).json(request);
        } catch (e) {
            next(e);
        }
    }
    public async changeModelRequestStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id, action } = req.params as {
                id: string;
                action: RequestAction;
            };
            const request = await requestService.changeModelRequestStatus(
                id,
                action,
            );
            res.status(StatusCodes.OK).json(request);
        } catch (e) {
            next(e);
        }
    }
}
export const requestController = new RequestController();
