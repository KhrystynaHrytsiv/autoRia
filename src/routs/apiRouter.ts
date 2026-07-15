import {Router} from "express";
import {authRouter} from "./authRouter";

export const apiRouter = Router();

apiRouter.use('/auth', authRouter)