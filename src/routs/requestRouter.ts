import {Router} from "express";
import {requestController} from "../controllers/requestController";
import {authMiddleware} from "../middlewares/authMiddleware";

export const requestRouter = Router();
requestRouter.post('/brand-request', authMiddleware.checkAccess, requestController.createBrandRequest)
requestRouter.post('/model-request', authMiddleware.checkAccess, requestController.createModelRequest)