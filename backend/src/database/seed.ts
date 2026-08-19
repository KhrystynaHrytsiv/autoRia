import dns from "node:dns";

import mongoose from "mongoose";

import { config } from "../configs/config";
import { logger } from "../logger";
import { Brand } from "../models/brandModel";
import { Model } from "../models/modelModel";
import { brands } from "./brands";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const seed = async () => {
    await mongoose.connect(config.mongo_uri);
    logger.info("Connected");
    await Brand.deleteMany({});
    await Model.deleteMany({});
    for (const brand of brands) {
        const createdBrand = await Brand.create({ name: brand.name });
        for (const model of brand.models) {
            await Model.create({ name: model, brandId: createdBrand.id });
        }
    }
    process.exit(0);
};
seed();
