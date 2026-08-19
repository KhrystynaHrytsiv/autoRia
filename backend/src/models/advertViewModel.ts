import { model, Schema } from "mongoose";

import { IAdvertView } from "../interfaces/IAdvertView";
import { Advertisement } from "./advertModel";

const advertViewSchema = new Schema(
    {
        advertId: {
            type: Schema.Types.ObjectId,
            ref: Advertisement,
            required: true,
        },
        viewedAt: { type: Date, default: Date.now },
    },
    { versionKey: false },
);
export const AdvertView = model<IAdvertView>("advertView", advertViewSchema);
