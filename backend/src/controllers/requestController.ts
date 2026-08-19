import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
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

    public async rejectRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id, type } = req.params as {
                id: string;
                type: "brand" | "model";
            };
            if (type !== "brand" && type !== "model") {
                throw new apiError(
                    "Invalid request type",
                    StatusCodes.BAD_REQUEST,
                );
            }
            const request = await requestService.rejectRequest(id, type);
            res.status(StatusCodes.OK).json(request);
        } catch (e) {
            next(e);
        }
    }
    public async approveRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id, type } = req.params as {
                id: string;
                type: "brand" | "model";
            };
            if (type !== "brand" && type !== "model") {
                throw new apiError(
                    "Invalid request type",
                    StatusCodes.BAD_REQUEST,
                );
            }
            const request = await requestService.approveRequest(id, type);
            res.status(StatusCodes.OK).json(request);
        } catch (e) {
            next(e);
        }
    }
}
export const requestController = new RequestController();
