import {Router} from "express";
import {userController} from "../controllers/userController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {UserValidator} from "../validators/userValidator";
import {authMiddleware} from "../middlewares/authMiddleware";

export const userRouter = Router();
userRouter.get('', userController.getAll)
userRouter.get('/:id', userController.getById)
userRouter.post('/create-manager', authMiddleware.checkAccess, authMiddleware.isAdmin, validateMiddleware.validateBody(UserValidator.create), userController.createManager)
userRouter.patch('/block/:id', authMiddleware.checkAccess, authMiddleware.hasPermission, userController.blockUser)
userRouter.patch('/unblock/:id', authMiddleware.checkAccess, authMiddleware.hasPermission, userController.unBlockUser)