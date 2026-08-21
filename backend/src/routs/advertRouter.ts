import { Router } from "express";

import { upload } from "../configs/multerConfig";
import { advertController } from "../controllers/advertController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validateMiddleware";
import { AdvertValidator } from "../validators/advertValidator";

export const advertRouter = Router();

advertRouter.post(
    "",
    authMiddleware.checkAccess,
    upload.array("images", 10),
    validateMiddleware.validateBody(AdvertValidator.createAdvert),
    advertController.create,
);
advertRouter.get(
    "",
    validateMiddleware.validateQuery(AdvertValidator.query),
    advertController.getAll,
);
advertRouter.get("/:id", advertController.getById);
advertRouter.put(
    "/:id",
    authMiddleware.checkAccess,
    upload.array("images", 10),
    validateMiddleware.validateBody(AdvertValidator.update),
    advertController.update,
);
advertRouter.delete(
    "/:id",
    authMiddleware.checkAccess,
    advertController.delete,
);
advertRouter.get(
    "/:id/statistics",
    authMiddleware.checkAccess,
    advertController.getStatistics,
);
