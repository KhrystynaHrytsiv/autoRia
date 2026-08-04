import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { IAuth } from "../interfaces/IAuth";
import { ITokenPayload } from "../interfaces/IToken";
import { tokenRepository } from "../repositories/tokenRepository";
import { authService } from "../services/authService";
import { tokenService } from "../services/tokenService";
import { userService } from "../services/userService";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const user = await authService.register(body);
            res.status(StatusCodes.CREATED).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IAuth;
            const user = await authService.login(body);
            res.status(StatusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.tokenPayload as ITokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, role } = res.locals.tokenPayload as ITokenPayload;
            const tokenPair = tokenService.generateTokens({ userId, role });
            await tokenRepository.create({ ...tokenPair, userId: userId });
            res.status(StatusCodes.OK).json({ tokenPair });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
