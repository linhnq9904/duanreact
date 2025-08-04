import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    userId?: string;
}

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (cartItem: CartItem) => {
            const response = await fetch('http://localhost:3001/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            });

            if (!response.ok) {
                throw new Error('Không thể thêm vào giỏ hàng');
            }

            return response.json();
        },
        onSuccess: () => {
            message.success('Đã thêm vào giỏ hàng');
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        },
        onError: () => {
            message.error('Không thể thêm vào giỏ hàng');
        },
    });
};