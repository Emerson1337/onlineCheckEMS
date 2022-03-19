export interface IRequestFood {
    name: string;
    price: number;
    tagFood: string;
    image: {
      uid: string,
      thumbUrl: string,
    };
    description: string;
}