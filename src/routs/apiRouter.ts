import {Router} from "express";
import {authRouter} from "./authRouter";
import {advertRouter} from "./advertTouter";

export const apiRouter = Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/advert', advertRouter)