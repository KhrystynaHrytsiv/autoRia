import {Router} from "express";
import {authRouter} from "./authRouter";
import {advertRouter} from "./advertRouter";
import {brandRouter} from "./brandRouter";
import {modelRouter} from "./modelRouter";

export const apiRouter = Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/adverts', advertRouter)
apiRouter.use('/brands', brandRouter)
apiRouter.use('/brands/:brandId/models', modelRouter)