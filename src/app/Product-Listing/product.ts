
export interface IProduct {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    description: string;
    price: number;
    tags?: string[];
    starRating: number;
    imageUrl: string;
    category: string;
    inStock: string;
}
