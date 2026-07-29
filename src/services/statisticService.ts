import {advertViewRepository} from "../repositories/advertViewRepository";
import {startOfDay, subDays, subMonths} from "date-fns";

class StatisticService{
    public async getStatistics(advertId:string){
    return{
        total: await advertViewRepository.countAll(advertId),
        today: await advertViewRepository.countFromDate(advertId, startOfDay(new Date())),
        week: await advertViewRepository.countFromDate(advertId, subDays(new Date(), 7)),
        month: await advertViewRepository.countFromDate(advertId, subMonths(new Date(), 1))
    }
    }
    public async calcAvgPrice(){

    }

}
export const statisticService = new StatisticService();