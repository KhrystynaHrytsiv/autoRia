import {Router} from "express";
import {modelController} from "./modelController";
import {validateMiddleware} from "../../common/middlewares/validateMiddleware";
import {CarValidator} from "../../common/validators/carValidator";

export const modelRouter = Router({
    mergeParams: true
});
modelRouter.get('', modelController.getAll)
modelRouter.post('', validateMiddleware.validateBody(CarValidator.createModel), modelController.create)
modelRouter.delete('/:id', modelController.delete)