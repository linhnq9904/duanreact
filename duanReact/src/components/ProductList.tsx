import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Space, Table } from "antd";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useList } from "../../hooks/useList";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

function ProductList() {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    const handleDelete = async (id: string) => {
        const res = await fetch(`http://localhost:3001/products/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Xóa thất bại");
        return true;
    };
    const mutation = useMutation({
        mutationFn: handleDelete,
        onSuccess: () => {
            message.success("Tạo sản phẩm thành công!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: () => {
            message.error("Tạo sản phẩm thất bại!");
        },
    });
    const { data, isLoading, error } = useList("products");
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
                        onConfirm={() => mutation.mutate(record.id)}
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