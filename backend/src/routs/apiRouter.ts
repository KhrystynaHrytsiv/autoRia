import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validateMiddleware";
import { advertRouter } from "./advertRouter";
import { authRouter } from "./authRouter";
import { brandRouter } from "./brandRouter";
import { modelRouter } from "./modelRouter";
import { requestRouter } from "./requestRouter";
import { userRouter } from "./userRouter";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/adverts", advertRouter);
apiRouter.use("/brands", brandRouter);
apiRouter.use(
    "/brands/:brandId/models",
    validateMiddleware.isValidId("brandId"),
    modelRouter,
);
apiRouter.use("/requests", authMiddleware.checkAccess, requestRouter);
