import {Router} from "express";
import {brandController} from "./brandController";
import {validateMiddleware} from "../../common/middlewares/validateMiddleware";
import {CarValidator} from "../../common/validators/carValidator";

export const brandRouter = Router();
brandRouter.get('', brandController.getAll);
brandRouter.post ('', validateMiddleware.validateBody(CarValidator.createBrand), brandController.create)
brandRouter.delete('/:id', brandController.delete)