import { useQuery } from "@tanstack/react-query";
import { Image, Spin, Table } from "antd";
import Header from "./Header";
import Item from "antd/es/list/Item";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}
interface Order {
    id: string;
    customerName: string;
    products: OrderProduct[];
    total: number;
    status: string;
}
interface OrderProduct {
    productId: string;
    quantity: number;
}

function OrderList() {
    const { data: products, isLoading: loadingProducts } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:3001/products').then(res => res.json())
    });
    const { data: order, isLoading: loadingOrders } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: () => fetch('http://localhost:3001/orders').then(res => res.json())
    });
    const dataSource = order?.map(order => {
        const detailedProducts = order.products.map(p => {
            const product = products?.find(prod => prod.id == p.productId);
            return {
                ...p,
                name: product?.name,
                image: product?.image,
                description: product?.description,
            };
        });
        return {
            ...order,
            detailedProducts,
        };
    });
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "customerName",
            dataIndex: "customerName",
        },
        {
            title: "products",
            dataIndex: "detailedProducts",
            render: (Item: any[]) => (
                <ul>
                    {Item?.map((item, index) => (
                        <li key={index}>
                            {item.name} x {item.quantity}
                        </li>
                    ))}
                </ul>
            )
        },
        {
            title: "Image",
            dataIndex: "detailedProducts",
            render: (src: string, recourd: Product, index: number) => {
                return <Image src={src} width={300} alt={recourd.name} />;
            },
        },
        {
            title: "Description",
        },
    ];
    return (
        <div>
            < Header />
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={"id"}
                loading={loadingOrders || loadingProducts}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}

export default OrderList;