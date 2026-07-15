import express, {NextFunction, Response, Request} from "express";
import mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routs/apiRouter";
import {apiError} from "./error/apiError";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/', apiRouter);
app.use((err: apiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});


const connection = async () =>{
    let dbCon=false;
    while (!dbCon){
        try{
            await mongoose.connect(config.mongo_uri);
            dbCon=true;
            console.log('Connection available');
        }catch (e) {
            console.log(e)
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}

const start = async () =>{
    try{
        await connection();
        app.listen(config.port, () =>{
            console.log(`Database is listening on ${config.port} port`);
        })
    } catch (e) {
        console.log(e);
    }
};

void start()
