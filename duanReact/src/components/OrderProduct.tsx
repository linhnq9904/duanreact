import { useQuery } from "@tanstack/react-query";
import { Table, Image } from "antd";
import Header from "./Header";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface OrderProduct {
    productId: string;
    quantity: number;
}

interface Order {
    id: string;
    customerName: string;
    products: OrderProduct[];
    total: number;
    status: string;
}

function OrderProduct() {
    // Lấy products
    const { data: products, isLoading: loadingProducts } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: () => fetch("http://localhost:3001/products").then(res => res.json()),
    });

    // Lấy orders
    const { data: orders, isLoading: loadingOrders, error } = useQuery<Order[]>({
        queryKey: ["orders"],
        queryFn: () => fetch("http://localhost:3001/orders").then(res => res.json()),
    });

    // Tạo danh sách orderItems (flattened)
    const orderItems = orders?.flatMap(order =>
        order.products.map(item => {
            const product = products?.find(p => p.id === item.productId);
            return {
                orderId: order.id,
                customerName: order.customerName,
                productName: product?.name,
                quantity: item.quantity,
                image: product?.image,
                status: order.status,
            };
        })
    );

    const columns = [
        {
            title: "Order ID",
            dataIndex: "orderId",
        },
        {
            title: "Customer",
            dataIndex: "customerName",
        },
        {
            title: "Product",
            dataIndex: "productName",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (src: string) => (
                <Image src={src} width={60} alt="product" />
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        }
    ];

    return (
        <div>
            <Header />
            {error && <p>Error: {(error as Error).message}</p>}
            <Table
                dataSource={orderItems}
                columns={columns}
                rowKey={(record) => `${record.orderId}-${record.productName}`}
                loading={loadingOrders || loadingProducts}
                pagination={{ pageSize: 6 }}
            />
        </div>
    );
}

export default OrderProduct;
