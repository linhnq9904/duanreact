import { useQuery } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Space, Table } from "antd";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

function ProductList() {
    const nav = useNavigate();
    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:3001/products/${id}`, {
                method: "DELETE",
            });
            message.success("Xóa sản phẩm thành công");
        } catch (err) {
            message.error("Lỗi khi xóa sản phẩm");
        }
    };
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3001/products");
        return res.json();
    };
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
    console.log(data, isLoading, error);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            // sorter: (a: Product, b: Product) => a.price - b.price,
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (src: string, recourd: Product) => {
                return <Image src={src} width={300} alt={recourd.name} />;
            },
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Action",
            render: (_: any, record: Product) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => nav(`/product/edit/${record.id}`)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa không?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            < Header />
            {/* {isLoading && <Spin />} */}
            {error && <p>Error: {error.message}</p>}
            {/* {data?.map((item: Product) => (
            <p key={item.id}>{item.name}</p>
        ))} */}
            <Table
                dataSource={data}
                columns={columns}
                rowKey={"id"}
                loading={isLoading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}

export default ProductList;