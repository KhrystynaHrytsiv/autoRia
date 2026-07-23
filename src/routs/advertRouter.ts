import {Router} from "express";
import {advertController} from "../controllers/advertController";
import {validateMiddleware} from "../middlewares/validateMiddleware";
import {AdvertValidator} from "../validators/advertValidator";
import {authMiddleware} from "../middlewares/authMiddleware";

export const advertRouter = Router();

advertRouter.post('', authMiddleware.checkAccess, validateMiddleware.validateBody(AdvertValidator.createAdvert), advertController.create)
advertRouter.get('', advertController.getAll)
advertRouter.put('/:id', advertController.update)
advertRouter.delete('/:id', advertController.delete)