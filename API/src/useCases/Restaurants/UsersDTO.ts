export interface IInfoRestaurant {
    id?: string,
    name?: string,
    password?: string,
    email?: string,
    enterprise: string,
    phone_number: string,
    delivery_fee: number,
    created_at?: Date,
    updated_at?: Date
}

export interface IRequestDataUser {
    name: string;
    enterprise: string;
    phone_number: string,
    delivery_fee: number
    email: string;
    password: string;
}