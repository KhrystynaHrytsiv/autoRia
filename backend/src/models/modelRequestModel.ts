import { model, Schema } from "mongoose";

import { RequestStatus } from "../enums/requestStatus";
import { IModelRequest } from "../interfaces/ICarRequest";
import { User } from "./userModel";

const modelRequestSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: User, required: true },
        brand: { type: String, required: true },
        name: { type: String, required: true },
        status: {
            type: String,
            enum: RequestStatus,
            default: RequestStatus.pending,
        },
    },
    { timestamps: true, versionKey: false },
);
export const ModelRequest = model<IModelRequest>(
    "modelRequest",
    modelRequestSchema,
);
