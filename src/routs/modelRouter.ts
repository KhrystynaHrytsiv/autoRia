import {Router} from "express";
import {modelController} from "../controllers/modelController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {CarValidator} from "../validators/carValidator";

export const modelRouter = Router();
modelRouter.get('', modelController.getAll)
modelRouter.post('', validateMiddleware.validateBody(CarValidator.createModel), modelController.create)