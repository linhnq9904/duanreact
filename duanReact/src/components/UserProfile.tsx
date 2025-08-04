import React from 'react';
import { Tabs, Card, Form, Input, Button, Table, Tag, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Header from './Header';

const { Title, Text } = Typography;

interface UserInfo {
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

interface Order {
    id: string;
    date: string;
    total: number;
    status: string;
}

const UserProfile: React.FC = () => {
    const [form] = Form.useForm<UserInfo>();

    const orderColumns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            render: (total: number) => `${total.toLocaleString('vi-VN')}đ`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: string) => (
                <Tag color={status === 'completed' ? 'success' : 'processing'}>
                    {status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                </Tag>
            ),
        },
    ];

    return (
        <>
            <Header />
            <div style={{ maxWidth: 1200, margin: '20px auto', padding: '0 20px' }}>
                <Card>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <Avatar size={100} icon={<UserOutlined />} />
                        <Title level={3} style={{ marginTop: 16 }}>Nguyễn Văn A</Title>
                        <Text type="secondary">nguyenvana@example.com</Text>
                    </div>

                    <Tabs>
                        <Tabs.TabPane tab="Thông tin cá nhân" key="profile">
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{
                                    fullName: 'Nguyễn Văn A',
                                    email: 'nguyenvana@example.com',
                                    phone: '0123456789',
                                    address: 'Hà Nội',
                                }}
                            >
                                <Form.Item
                                    name="fullName"
                                    label="Họ tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="address"
                                    label="Địa chỉ"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                >
                                    <Input.TextArea rows={4} />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary">Cập nhật thông tin</Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Đơn hàng của tôi" key="orders">
                            <Table
                                columns={orderColumns}
                                dataSource={[
                                    {
                                        id: 'DH001',
                                        date: '2024-01-20',
                                        total: 500000,
                                        status: 'completed',
                                    },
                                    {
                                        id: 'DH002',
                                        date: '2024-01-21',
                                        total: 300000,
                                        status: 'processing',
                                    },
                                ]}
                                rowKey="id"
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </div>
        </>
    );
};

export default UserProfile;