import { model, Schema } from "mongoose";

import { IBrand } from "../interfaces/ICar";

const brandSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: false, versionKey: false },
);
export const Brand = model<IBrand>("brand", brandSchema);
