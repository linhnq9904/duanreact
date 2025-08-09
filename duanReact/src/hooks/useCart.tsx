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
                            }
                        } catch (error) {
                            return { ...item, name: "Sản phẩm không tồn tại", price: 0, image: "" };
                        }
                    })
                )
                setCart(cartWithProducts);
            } catch (error) {
                message.error("Không thể tải giỏ hàng");
            } finally {
                setLoading(false);
            }
        };

        const addToCart = async (productId: string, quantity = 1) => {
            try {
                const existingItem = cart.find(item => item.id === productId);

                if (existingItem) {
                    await axios.put(`http://localhost:3001/carts/${existingItem.id}`, {
                        quantity: existingItem.quantity + quantity
                    });
                    setCart(prev =>
                        prev.map(item =>
                            item.id === productId
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    );
                    message.success("Đã tăng số lượng sản phẩm trong giỏ hàng");
                } else {
                    await axios.post("http://localhost:3001/carts", {
                        product_id: productId,
                        quantity: 1
                    });
                    message.success("Đã thêm vào giỏ hàng");
                    fetchCart();
                }
            } catch (error) {
                message.error("Thêm vào giỏ hàng thất bại");
            }
        };


        const updateQuantity = async (cartItemId: string, quantity: number) => {
            try {
                await axios.put(`http://localhost:3001/carts/${cartItemId}`, {
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
                await axios.delete(`http://localhost:3001/carts/${cartItemId}`);
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
