    import {Router} from "express";
    import {authRouter} from "../../modules/auth/authRouter";
    import {advertRouter} from "../../modules/advert/advertRouter";
    import {brandRouter} from "../../modules/car/brandRouter";
    import {modelRouter} from "../../modules/car/modelRouter";
    import {validateMiddleware} from "../middlewares/validateMiddleware";
    import {userRouter} from "../../modules/user/userRouter";
    import {requestRouter} from "../../modules/requests/requestRouter";
    import {authMiddleware} from "../middlewares/authMiddleware";

    export const apiRouter = Router();

    apiRouter.use('/auth', authRouter)
    apiRouter.use('/users', userRouter)
    apiRouter.use('/adverts', advertRouter)
    apiRouter.use('/brands/:brandId/models',validateMiddleware.isValidId("brandId"), modelRouter)
    apiRouter.use('/brands', brandRouter)
    apiRouter.use('/requests', authMiddleware.checkAccess, requestRouter)
