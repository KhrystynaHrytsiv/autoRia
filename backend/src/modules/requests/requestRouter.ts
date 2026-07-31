import {Router} from "express";
import {requestController} from "./requestController";
import {authMiddleware} from "../../common/middlewares/authMiddleware";
import {validateMiddleware} from "../../common/middlewares/validateMiddleware";
import {CarValidator} from "../../common/validators/carValidator";

export const requestRouter = Router();
requestRouter.post('/brand-request', validateMiddleware.validateBody(CarValidator.createBrand), requestController.createBrandRequest)
requestRouter.post('/model-request', validateMiddleware.validateBody(CarValidator.createModel), requestController.createModelRequest)
requestRouter.get('/brands', authMiddleware.hasPermission, requestController.getAllBrandRequests)
requestRouter.get('/models', authMiddleware.hasPermission, requestController.getAllModelRequests)
requestRouter.patch('/brand/:id/approve', authMiddleware.hasPermission, requestController.approveBrandRequest)
requestRouter.patch('/model/:id/approve', authMiddleware.hasPermission, requestController.approveModelRequest)
requestRouter.patch('/brand/:id/reject', authMiddleware.hasPermission, requestController.rejectBrandRequest)
requestRouter.patch('/model/:id/reject', authMiddleware.hasPermission, requestController.rejectModelRequest)