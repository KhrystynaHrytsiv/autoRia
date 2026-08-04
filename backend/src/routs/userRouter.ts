import { Router } from "express";

import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validateMiddleware";
import { UserValidator } from "../validators/userValidator";

export const userRouter = Router();
userRouter.get(
    "",
    authMiddleware.checkAccess,
    authMiddleware.hasPermission,
    userController.getAll,
);
userRouter.get("/:id", userController.getById);
userRouter.post(
    "/create-manager",
    authMiddleware.checkAccess,
    authMiddleware.isAdmin,
    validateMiddleware.validateBody(UserValidator.create),
    userController.createManager,
);
userRouter.patch(
    "/:id/block",
    authMiddleware.checkAccess,
    authMiddleware.hasPermission,
    userController.blockUser,
);
userRouter.patch(
    "/:id/activate",
    authMiddleware.checkAccess,
    authMiddleware.hasPermission,
    userController.unBlockUser,
);
userRouter.patch(
    "/premium",
    authMiddleware.checkAccess,
    userController.changeToPremiumAccount,
);
