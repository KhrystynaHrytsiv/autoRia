import {ObjectSchema, ValidationError} from "joi";
import {Request, Response, NextFunction} from "express";
import {apiError} from "../error/apiError";
import {StatusCodes} from "../enums/statusCodes";

class ValidateMiddleware{
    public validateBody( validator:ObjectSchema){
        return async (req:Request, res:Response, next:NextFunction ) =>{
            try{
                req.body = await validator.validateAsync(req.body);
                next()
            }catch (e) {
                const err = e as ValidationError;
                next(new apiError(err.details[0].message, StatusCodes.BAD_REQUEST))
            }
        }
    }
}
export const validateMiddleware = new ValidateMiddleware();