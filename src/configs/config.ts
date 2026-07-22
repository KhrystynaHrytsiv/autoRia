import dotenv from "dotenv";

dotenv.config()

interface IConfig{
    port: string
    mongo_uri : string,
    JWT_ACCESS_SECRET:string
    JWT_REFRESH_SECRET:string
    JWT_ACCESS_LIFETIME:any
    JWT_REFRESH_LIFETIME:any
    PRIVAT_API_URL:string
}

export const config:IConfig = {
    port: process.env.PORT!,
    mongo_uri: process.env.MONGO_URI!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME!,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME!,
    PRIVAT_API_URL: process.env.PRIVAT_API_URL!
}