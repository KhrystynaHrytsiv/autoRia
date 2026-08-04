import { model, Schema } from "mongoose";

import { RequestStatus } from "../enums/requestStatus";
import { IBrandRequest } from "../interfaces/ICarRequest";
import { User } from "./userModel";

const brandRequestSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: User, required: true },
        name: { type: String, required: true },
        status: {
            type: String,
            enum: RequestStatus,
            default: RequestStatus.pending,
        },
    },
    { timestamps: true, versionKey: false },
);
export const BrandRequest = model<IBrandRequest>(
    "brandRequest",
    brandRequestSchema,
);
