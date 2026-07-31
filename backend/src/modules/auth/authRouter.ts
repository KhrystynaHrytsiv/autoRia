import {Router} from "express";
import {authController} from "./authController";
import {validateMiddleware} from "../../common/middlewares/validateMiddleware";
import {UserValidator} from "../../common/validators/userValidator";

export const authRouter = Router();
authRouter.post('/register', validateMiddleware.validateBody(UserValidator.create), authController.register);
authRouter.post('/login',  authController.login)