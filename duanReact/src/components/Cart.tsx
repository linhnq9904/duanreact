import { useCart } from "../hooks/useCart";
import { Table, InputNumber, Popconfirm, Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function Cart() {
    const { cart, updateQuantity, removeItem } = useCart();
    const grandTotal = cart.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0);


    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "name",
            render: (_: any, record: any) => (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                        src={record.image}
                        alt={record.name}
                        style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                        onError={(e) => e.currentTarget.src = "/placeholder.png"}
                    />
                    <span>{record.name}</span>
                </div>
            )
        },
        {
            title: "Giá",
            dataIndex: "price",
            render: (price: number) => (
                <Text strong>
                    {price != null ? price.toLocaleString("vi-VN") + "đ" : "—"}
                </Text>
            )
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            render: (qty: number, record: any) => (
                <InputNumber
                    min={1}
                    value={qty}
                    onChange={(value) => updateQuantity(record.id, value || 1)}
                />
            )
        },
        {
            title: "Tổng",
            render: (_: any, record: any) => {
                const total = (record.price ?? 0) * (record.quantity ?? 0);
                return <Text strong>{total.toLocaleString("vi-VN")}đ</Text>;
            }
        },
        {
            title: "Hành động",
            render: (_: any, record: any) => (
                <Popconfirm
                    title="Xóa sản phẩm?"
                    onConfirm={() => removeItem(record.id)}
                >
                    <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
            )
        },
    ];

    return (
        <Table
            dataSource={cart}
            columns={columns}
            rowKey="id"
            pagination={false}
            summary={() => (
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                        <Text strong>Tổng cộng</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                        <Text strong>{grandTotal.toLocaleString("vi-VN")}đ</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} />
                </Table.Summary.Row>
            )}
        />
    );
}
