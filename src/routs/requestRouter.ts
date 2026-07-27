import {Router} from "express";
import {requestController} from "../controllers/requestController";
import {authMiddleware} from "../middlewares/authMiddleware";

export const requestRouter = Router();
requestRouter.post('/brand-request', requestController.createBrandRequest)
requestRouter.post('/model-request', requestController.createModelRequest)
requestRouter.get('/brands', authMiddleware.hasPermission, requestController.getAllBrandRequests)
requestRouter.get('/models', authMiddleware.hasPermission, requestController.getAllModelRequests)
requestRouter.patch('/brand/:id/approve', authMiddleware.hasPermission, requestController.approveBrandRequest)
requestRouter.patch('/model/:id/approve', authMiddleware.hasPermission, requestController.approveModelRequest)