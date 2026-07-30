import {currencyCron} from "./currencyCron";

export const cronRunner = async() =>{
    await currencyCron.fireOnTick();
    currencyCron.start()
}