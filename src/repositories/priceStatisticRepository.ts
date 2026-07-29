import {PriceStatistic} from "../models/priceStatisticModel";

class PriceStatisticRepository {
   public getByLocation(location:string){
       return PriceStatistic.findOne({location})
   }
   public create(data:any){
       return PriceStatistic.create(data)
   }
    public update(id:string, data:any){
        return PriceStatistic.findByIdAndUpdate(id, data, {returnDocument:"after"});
    }
}
export const priceStatisticRepository = new PriceStatisticRepository();