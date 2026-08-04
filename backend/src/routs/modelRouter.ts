import {Router} from "express";
import {modelController} from "../controllers/modelController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {CarValidator} from "../validators/carValidator";
import {authMiddleware} from "../middlewares/authMiddleware";

export const modelRouter = Router({
    mergeParams: true
});
modelRouter.get('/', modelController.getAll)
modelRouter.post('', authMiddleware.checkAccess, authMiddleware.hasPermission, validateMiddleware.validateBody(CarValidator.createModel), modelController.create)
modelRouter.delete('/:id', authMiddleware.checkAccess, authMiddleware.hasPermission, modelController.delete)