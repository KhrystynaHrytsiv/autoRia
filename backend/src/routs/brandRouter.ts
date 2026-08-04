import {Router} from "express";
import {brandController} from "../controllers/brandController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {CarValidator} from "../validators/carValidator";
import {authMiddleware} from "../middlewares/authMiddleware";

export const brandRouter = Router();
brandRouter.get('', brandController.getAll);
brandRouter.post ('', validateMiddleware.validateBody(CarValidator.createBrand), authMiddleware.checkAccess, authMiddleware.hasPermission, brandController.create)
brandRouter.delete('/:id', authMiddleware.checkAccess, authMiddleware.hasPermission, brandController.delete)