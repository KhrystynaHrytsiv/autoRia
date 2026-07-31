    import {Router} from "express";
    import {authRouter} from "./authRouter";
    import {advertRouter} from "./advertRouter";
    import {brandRouter} from "./brandRouter";
    import {modelRouter} from "./modelRouter";
    import {validateMiddleware} from "../middlewares/validateMiddleware";
    import {userRouter} from "./userRouter";
    import {requestRouter} from "./requestRouter";
    import {authMiddleware} from "../middlewares/authMiddleware";

    export const apiRouter = Router();

    apiRouter.use('/auth', authRouter)
    apiRouter.use('/users', userRouter)
    apiRouter.use('/adverts', advertRouter)
    apiRouter.use('/brands', brandRouter)
    apiRouter.use('/brands/:brandId/models',validateMiddleware.isValidId("brandId"), modelRouter)
    apiRouter.use('/requests', authMiddleware.checkAccess, requestRouter)
