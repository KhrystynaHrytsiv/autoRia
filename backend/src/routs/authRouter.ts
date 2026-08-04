import { Router } from "express";

import { authController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validateMiddleware";
import { AuthValidator } from "../validators/authValidator";
import { UserValidator } from "../validators/userValidator";

export const authRouter = Router();
authRouter.post(
    "/register",
    validateMiddleware.validateBody(UserValidator.create),
    authController.register,
);
authRouter.post("/login", authController.login);
authRouter.get("/me", authMiddleware.checkAccess, authController.me);
authRouter.post(
    "/refresh",
    validateMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefresh,
    authController.refresh,
);
