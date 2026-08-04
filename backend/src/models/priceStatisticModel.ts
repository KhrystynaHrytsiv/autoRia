import { model, Schema } from "mongoose";

import { IPriceStatistic } from "../interfaces/IPriceStatistic";
import { Brand } from "./brandModel";
import { Model } from "./modelModel";

const priceStatisticSchema = new Schema(
    {
        region: { type: String, required: true },
        country: { type: String, required: true },
        brand: { type: Schema.Types.ObjectId, ref: Brand, required: true },
        model: { type: Schema.Types.ObjectId, ref: Model, required: true },
        averagePrice: { type: Number },
        updatedAt: { type: Date, default: Date.now },
    },
    { versionKey: false },
);
export const PriceStatistic = model<IPriceStatistic>(
    "priceStatistic",
    priceStatisticSchema,
);
