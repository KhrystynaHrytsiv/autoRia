import {Router} from "express";
import {authController} from "../controllers/authController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {UserValidator} from "../validators/userValidator";

export const authRouter = Router();
authRouter.post('/register', validateMiddleware.validateBody(UserValidator.create), authController.register);
authRouter.post('/login',  authController.login)