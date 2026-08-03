import {Router} from "express";
import {authController} from "../controllers/authController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {UserValidator} from "../validators/userValidator";
import {authMiddleware} from "../middlewares/authMiddleware";
import {AuthValidator} from "../validators/authValidator";

export const authRouter = Router();
authRouter.post('/register', validateMiddleware.validateBody(UserValidator.create), authController.register);
authRouter.post('/login',  authController.login)
authRouter.get('/me', authMiddleware.checkAccess, authController.me)
    authRouter.post('/refresh', validateMiddleware.validateBody(AuthValidator.refreshToken), authMiddleware.checkRefresh, authController.refresh)