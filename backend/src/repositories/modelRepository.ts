import { CreateModelDto, IModel } from "../interfaces/ICar";
import { Model } from "../models/modelModel";

class ModelRepository {
    public getAll(brandId: string): Promise<IModel[]> {
        return Model.find({ brandId });
    }
    public create(brandId: string, dto: CreateModelDto): Promise<IModel> {
        return Model.create({ name: dto.name, brandId: brandId });
    }
    public getById(id: string): Promise<IModel | null> {
        return Model.findById(id).populate("brandId");
    }
    public getByName(name: string): Promise<IModel | null> {
        return Model.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    }
    public delete(id: string): Promise<IModel | null> {
        return Model.findByIdAndDelete(id);
    }
}

export const modelRepository = new ModelRepository();
