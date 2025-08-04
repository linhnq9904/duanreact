import React from 'react';
import { Table, Button, InputNumber, Typography, Space, Card, Row, Col, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useList } from '../../hooks/useList';

const { Title, Text } = Typography;

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    productId: string;
    userId: string;
}

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { data: cartItems, isLoading, error } = useList('carts');

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            render: (_: string, record: CartItem) => (
                <Space>
                    <img src={record.image} alt={record.name} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                    <Text>{record.name}</Text>
                </Space>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (price: number) => `${price.toLocaleString('vi-VN')}đ`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (_: number, record: CartItem) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) => updateQuantity(record.id, value || 1)}
                />
            ),
        },
        {
            title: 'Thành tiền',
            render: (_: any, record: CartItem) =>
                `${(record.price * record.quantity).toLocaleString('vi-VN')}đ`,
        },
        {
            title: '',
            render: (_: any, record: CartItem) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(record.id)}
                />
            ),
        },
    ];

    const updateQuantity = async (id: string, quantity: number) => {
        try {
            const response = await fetch(`http://localhost:3001/carts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });
            if (!response.ok) throw new Error('Failed to update quantity');
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/carts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to remove item');
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    if (isLoading) return <Spin size="large" />;
    if (error) return <div>Error loading cart items</div>;

    const total = cartItems?.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0) || 0;

    return (
        <>
            <Header />
            <div style={{ maxWidth: 1200, margin: '20px auto', padding: '0 20px' }}>
                <Title level={2}>Giỏ hàng</Title>
                <Row gutter={24}>
                    <Col span={16}>
                        <Table
                            columns={columns}
                            dataSource={cartItems}
                            rowKey="id"
                            pagination={false}
                        />
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Title level={4}>Tổng tiền</Title>
                            <Text strong style={{ fontSize: 24, color: '#f5222d' }}>
                                {total.toLocaleString('vi-VN')}đ
                            </Text>
                            <Button
                                type="primary"
                                size="large"
                                block
                                style={{ marginTop: 16 }}
                                onClick={() => navigate('/checkout')}
                            >
                                Thanh toán
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Cart;