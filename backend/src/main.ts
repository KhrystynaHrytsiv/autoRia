/*eslint-disable no-console*/
import dns from "node:dns";
import path from "node:path";

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { swaggerDocument, swaggerUI } from "./configs/swaggerConfig";
import { cronRunner } from "./crons";
import { apiError } from "./error/apiError";
import { apiRouter } from "./routs/apiRouter";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/", apiRouter);
app.use("/images", express.static(path.join(process.cwd(), "uploads")));
app.use((err: apiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});

const connection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            await mongoose.connect(config.mongo_uri);
            dbCon = true;
            console.log("Connection available");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await connection();
        app.listen(config.port, async () => {
            console.log(`Database is listening on ${config.port} port`);
            await cronRunner();
        });
    } catch (e) {
        console.log(e);
    }
};

void start();
