import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodes } from "../enums/statusCodes";
import { apiError } from "../error/apiError";

class ValidateMiddleware {
    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                const err = e as ValidationError;
                next(
                    new apiError(
                        err.details[0].message,
                        StatusCodes.BAD_REQUEST,
                    ),
                );
            }
        };
    }
    public isValidId(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new apiError(
                        `${key}: ${id} invalid Id`,
                        StatusCodes.BAD_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
    public validateQuery(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                (req as any).validateQuery = await validator.validateAsync(
                    req.query,
                );
                next();
            } catch (err) {
                const e = err as ValidationError;
                next(
                    new apiError(e.details[0].message, StatusCodes.BAD_REQUEST),
                );
            }
        };
    }
}
export const validateMiddleware = new ValidateMiddleware();
