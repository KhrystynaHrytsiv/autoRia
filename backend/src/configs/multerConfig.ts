import path from "node:path";

import { Request } from "express";
import multer from "multer";
import { v6 } from "uuid";

import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(process.cwd(), "uploads"));
    },
    filename: (req, file, callback) => {
        const uniqSuffix = v6();
        const ext = path.extname(file.originalname);
        callback(null, `${uniqSuffix}${ext}`);
    },
});
const fileFilter = (req: Request, file: any, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase(),
    );
    const mineType = allowedTypes.test(file.mimetype);
    if (extName && mineType) {
        return cb(null, true);
    } else {
        cb(new apiError("Only images are allowed", StatusCodes.BAD_REQUEST));
    }
};
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter,
});
