import {Router} from "express";
import {advertController} from "../controllers/advertController";

export const advertRouter = Router();

advertRouter.post('', advertController.create)
advertRouter.get('', advertController.getAll)
advertRouter.put('/:id', advertController.update)
advertRouter.delete('/:id', advertController.delete)