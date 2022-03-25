import FoodTypes from "../../entities/FoodTypes";
import { v4 as uuid } from 'uuid';

class CategoryRepositoryInMemory {
    private categories: FoodTypes[] = [];

    async create(category: FoodTypes): Promise<FoodTypes> {
        Object.assign(category, {
            id: uuid(),
        });

        this.categories.push(category);
        return category;
    }

    async save(category: FoodTypes): Promise<boolean> { 
        this.categories.push(category);
        return true;
    }

    async findOne(objectWhere: any): Promise<any> {
        let foundCategory = this.categories.find(category => category.name == objectWhere.where.name && category.restaurant_id == objectWhere.where.restaurant_id);
        return foundCategory
    }

}

export default CategoryRepositoryInMemory;