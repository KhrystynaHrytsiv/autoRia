import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";
import { ITokenPayload } from "../interfaces/IToken";
import { userService } from "../services/userService";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            res.status(StatusCodes.OK).json(users);
        } catch (e) {
            next(e);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const user = await userService.getById(id);
            res.status(StatusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async createManager(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const body = req.body;
            const manager = await userService.createManager(body);
            res.status(StatusCodes.CREATED).json(manager);
        } catch (e) {
            next(e);
        }
    }
    public async changeUserStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.id as string;
            const { userId: myId } = res.locals.tokenPayload as ITokenPayload;
            if (id === myId) {
                throw new apiError("Not permitted", StatusCodes.FORBIDDEN);
            }
            const isActive = req.path.endsWith("/activate");
            const user = await userService.changeStatus(id, isActive);
            res.status(StatusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async changeToPremiumAccount(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { userId } = res.locals.tokenPayload as ITokenPayload;
            const user = await userService.changeToPremiumAccount(userId);
            res.status(StatusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
