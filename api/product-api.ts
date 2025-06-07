import { Product } from "@/types/product-type";


export class ProductApi {
    // API functions
    static async fetchProducts(): Promise<Product[]> {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    };

    static async fetchProductById(id: number): Promise<Product> {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return response.json();
    };
}