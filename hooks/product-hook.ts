import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/api/product-api";

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: ProductApi.fetchProducts
    });
};

export const useProductById = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => ProductApi.fetchProductById(id)
    });
};

