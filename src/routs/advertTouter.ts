import {Router} from "express";
import {advertController} from "../controllers/advertController";

export const advertRouter = Router();

advertRouter.post('', advertController.create)