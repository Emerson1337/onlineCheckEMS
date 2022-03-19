export interface IMonthSaleInterface {
    id: string,
    name: string,
    tagFood: string,
    price: number,
    frequency: number,
    description: string,
    restaurant_id: string,
    created_at: Date,
    updated_at: Date
}

export interface IMonthSaleData {
    name: string,
    tagFood: string,
    description: string,
    qtd: number,
    price: number,
}