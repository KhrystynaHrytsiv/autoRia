import { model, Schema } from "mongoose";

import { AdvertStatus } from "../enums/advertStatus";
import { CurrencyEnum } from "../enums/currencyEnum";
import { IAdvert } from "../interfaces/IAdvert";
import { Brand } from "./brandModel";
import { Model } from "./modelModel";
import { User } from "./userModel";

const advertSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: User },
        title: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: Schema.Types.ObjectId, required: true, ref: Brand.name },
        model: { type: Schema.Types.ObjectId, required: true, ref: Model.name },
        price: {
            original: {
                value: { type: Number, required: true },
                currency: { type: String, enum: CurrencyEnum, required: true },
            },
            converted: {
                usd: { type: Number, required: true },
                eur: { type: Number, required: true },
                uah: { type: Number, required: true },
            },
            exchangeRateDate: { type: Date, required: true },
            exchangeRate: {
                usd: { type: Number, required: true },
                eur: { type: Number, required: true },
            },
        },
        year: { type: Number, required: true },
        location: {
            region: { type: String, required: true },
            country: { type: String, default: "Ukraine" },
        },
        status: {
            type: String,
            enum: AdvertStatus,
            required: true,
            default: AdvertStatus.pending_edit,
        },
        attempts: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
    },
    { timestamps: true, versionKey: false },
);

export const Advertisement = model<IAdvert>("advert", advertSchema);
