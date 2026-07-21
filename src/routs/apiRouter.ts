import {Router} from "express";
import {authRouter} from "./authRouter";
import {advertRouter} from "./advertRouter";
import {brandRouter} from "./brandRouter";
import {modelRouter} from "./modelRouter";
import {validateMiddleware} from "../middlewares/validateMiddleware";

export const apiRouter = Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/adverts', advertRouter)
apiRouter.use('/brands/:brandId/models',validateMiddleware.isValidId("brandId"), modelRouter)
apiRouter.use('/brands', brandRouter)
