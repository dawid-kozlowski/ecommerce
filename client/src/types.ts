export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    stockQuantity: number;
}

export interface CartItem extends Product {
    quantity: number;
    selectedVariant?: string;
}
