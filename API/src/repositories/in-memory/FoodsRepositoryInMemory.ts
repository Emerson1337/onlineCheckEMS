import Foods from "../../entities/Foods";
import { v4 as uuid } from 'uuid';

class FoodsRepositoryInMemory {
    private foods: Foods[] = [];

    async create(food: Foods): Promise<Foods> {
        Object.assign(food, {
            id: uuid(),
        });

        this.foods.push(food);
        return food;
    }

    async save(food: Foods): Promise<boolean> { 
        this.foods.push(food);
        return true;
    }

}

export default FoodsRepositoryInMemory;