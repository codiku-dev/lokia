import { H2 } from "@/components/ui/typography";
import { View, Image, ScrollView } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useProductStore } from "@/store/product/product-store";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/api/product-api";
import { useProducts } from "@/hooks/product-hook";

export function StoreExample() {
    const { selectedProduct, setSelectedProduct } = useProductStore();

    const {
        data: products,
        isLoading: isLoadingProducts,
        error: productsError,
        refetch: refetchProducts
    } = useProducts();

    const {
        data: product,
        isLoading: isLoadingProduct,
        error: productError,
        refetch: refetchProduct
    } = useQuery({
        queryKey: ['product', selectedProduct?.id],
        queryFn: () => selectedProduct ? ProductApi.fetchProductById(selectedProduct.id) : null,
        enabled: !!selectedProduct
    });

    if (isLoadingProducts) {
        return (
            <View className="items-center justify-center flex-1">
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (productsError) {
        return (
            <View className="gap-4">
                <Text className="text-destructive">Failed to load products</Text>
                <Button onPress={() => refetchProducts()}>
                    <Text>Retry</Text>
                </Button>
            </View>
        );
    }

    return (
        <View className="gap-4">
            <H2>Products Store Example (Persistent)</H2>

            {selectedProduct ? (
                <View className="gap-4">
                    <Button onPress={() => setSelectedProduct(null)}>
                        <Text>Back to List</Text>
                    </Button>
                    {isLoadingProduct ? (
                        <Text>Loading product details...</Text>
                    ) : productError ? (
                        <View className="gap-4">
                            <Text className="text-destructive">Failed to load product details</Text>
                            <Button onPress={() => refetchProduct()}>
                                <Text>Retry</Text>
                            </Button>
                        </View>
                    ) : product ? (
                        <View className="gap-2">
                            <Image
                                source={{ uri: product.image }}
                                className="w-full h-48"
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-bold">{product.title}</Text>
                        </View>
                    ) : null}
                </View>
            ) : (
                <ScrollView className="gap-4">
                    {products?.map((product) => (
                        <Button
                            key={product.id}
                            onPress={() => setSelectedProduct(product)}
                            className="flex-row items-center gap-2 p-2"
                        >
                            <Image
                                source={{ uri: product.image }}
                                className="w-16 h-16"
                                resizeMode="contain"
                            />
                            <View className="flex-1">
                                <Text className="font-medium" numberOfLines={1}>
                                    {product.title}
                                </Text>
                            </View>
                        </Button>
                    ))}
                </ScrollView>
            )}
        </View>
    );
} 