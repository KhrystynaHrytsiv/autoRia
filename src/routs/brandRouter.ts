import {Router} from "express";
import {brandController} from "../controllers/brandController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {CarValidator} from "../validators/carValidator";

export const brandRouter = Router();
brandRouter.get('', brandController.getAll);
brandRouter.post ('', validateMiddleware.validateBody(CarValidator.createBrand), brandController.create)
brandRouter.delete('/:id', brandController.delete)