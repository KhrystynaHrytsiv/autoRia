import { IAdvertView } from "../interfaces/IAdvertView";
import { AdvertView } from "../models/advertViewModel";

class AdvertViewRepository {
    public create(advertId: string): Promise<IAdvertView> {
        return AdvertView.create({ advertId });
    }
    public countAll(advertId: string): Promise<number> {
        return AdvertView.countDocuments({ advertId });
    }
    public countFromDate(advertId: string, date: Date): Promise<number> {
        return AdvertView.countDocuments({
            advertId,
            viewedAt: { $gte: date },
        });
    }
}
export const advertViewRepository = new AdvertViewRepository();
