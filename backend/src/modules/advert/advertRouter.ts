import {Router} from "express";
import {advertController} from "./advertController";
import {validateMiddleware} from "../../common/middlewares/validateMiddleware";
import {AdvertValidator} from "../../common/validators/advertValidator";
import {authMiddleware} from "../../common/middlewares/authMiddleware";

export const advertRouter = Router();

advertRouter.post('', authMiddleware.checkAccess, validateMiddleware.validateBody(AdvertValidator.createAdvert), advertController.create)
advertRouter.get('', advertController.getAll)
advertRouter.get('/:id', advertController.getById)
advertRouter.put('/:id',authMiddleware.checkAccess, advertController.update)
advertRouter.delete('/:id', authMiddleware.checkAccess, advertController.delete)
advertRouter.get('/:id/statistics', authMiddleware.checkAccess, advertController.getStatistics)
