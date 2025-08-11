import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

export interface CartItem {
    id: string;
    product_id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            const res = await axios.get(`http://localhost:3001/carts?userId=${userId}`);

            const cartWithProducts = await Promise.all(
                res.data.map(async (item: any) => {
                    try {
                        const productRes = await axios.get(`http://localhost:3001/products/${item.product_id}`);
                        const product = productRes.data;
                        return {
                            id: item.id,
                            product_id: item.product_id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: item.quantity
                        };
                    } catch {
                        return { ...item, name: "Sản phẩm không tồn tại", price: 0, image: "" };
                    }
                })
            );

            setCart(cartWithProducts);
        } catch {
            message.error("Không thể tải giỏ hàng");
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId: string, quantity = 1) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
                return;
            }

            const existingItem = cart.find(item => item.product_id === productId);

            if (existingItem) {
                await axios.put(`http://localhost:3001/carts/${existingItem.id}`, {
                    userId,
                    product_id: productId,
                    quantity: existingItem.quantity + quantity
                });
                setCart(prev =>
                    prev.map(item =>
                        item.product_id === productId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                );
                message.success("Đã tăng số lượng sản phẩm trong giỏ hàng");
            } else {
                await axios.post("http://localhost:3001/carts", {
                    userId,
                    product_id: productId,
                    quantity
                });
                message.success("Đã thêm vào giỏ hàng");
                fetchCart();
            }
        } catch {
            message.error("Thêm vào giỏ hàng thất bại");
        }
    };

    const updateQuantity = async (cartItemId: string, quantity: number) => {
        try {
            const userId = localStorage.getItem("userId");
            const item = cart.find(c => c.id === cartItemId);
            if (!item) return;
            setLoading(true);
            await axios.put(`http://localhost:3001/carts/${cartItemId}`, {
                userId,
                product_id: item.product_id,
                quantity
            });
            setCart(prev =>
                prev.map(item => item.id === cartItemId ? { ...item, quantity } : item)
            );
        } catch {
            message.error("Cập nhật số lượng thất bại");
        }
    };

    const removeItem = async (cartItemId: string) => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.delete(`http://localhost:3001/carts/${cartItemId}`, {
                data: { userId }
            });
            setCart(prev => prev.filter(item => item.id !== cartItemId));
            message.success("Đã xóa sản phẩm");
        } catch {
            message.error("Xóa sản phẩm thất bại");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return {
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem
    };
}
