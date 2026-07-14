import express from "express";
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routs/apiRouter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/', apiRouter)


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
            `Database is listening on ${config.port} port`
        })
    } catch (e) {
        console.log(e);
    }
};

void start()
