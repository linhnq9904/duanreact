import React from 'react';
import { Form, Input, Button, Radio, Card, Row, Col, Typography, Space, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const { Title, Text } = Typography;

interface CheckoutForm {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    paymentMethod: string;
}

const Checkout: React.FC = () => {
    const [form] = Form.useForm<CheckoutForm>();

    const onFinish = (values: CheckoutForm) => {
        console.log('Checkout values:', values);
    };

    return (
        <>
            <Header />
            <div style={{ maxWidth: 1200, margin: '20px auto', padding: '0 20px' }}>
                <Title level={2}>Thanh toán</Title>
                <Row gutter={24}>
                    <Col span={16}>
                        <Card>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Title level={4}>Thông tin giao hàng</Title>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="fullName"
                                            label="Họ tên"
                                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="phone"
                                            label="Số điện thoại"
                                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                        >
                                            <Input size="large" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    name="address"
                                    label="Địa chỉ giao hàng"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                >
                                    <Input.TextArea rows={4} size="large" />
                                </Form.Item>

                                <Divider />

                                <Title level={4}>Phương thức thanh toán</Title>
                                <Form.Item
                                    name="paymentMethod"
                                    rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                                >
                                    <Radio.Group>
                                        <Space direction="vertical">
                                            <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                                            <Radio value="bank">Chuyển khoản ngân hàng</Radio>
                                            <Radio value="momo">Ví MoMo</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" size="large" htmlType="submit">
                                        Đặt hàng
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Title level={4}>Đơn hàng của bạn</Title>
                            {/* Hiển thị thông tin đơn hàng */}
                            <Divider />
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Row justify="space-between">
                                    <Text>Tạm tính:</Text>
                                    <Text>500.000đ</Text>
                                </Row>
                                <Row justify="space-between">
                                    <Text>Phí vận chuyển:</Text>
                                    <Text>30.000đ</Text>
                                </Row>
                                <Divider />
                                <Row justify="space-between">
                                    <Text strong>Tổng cộng:</Text>
                                    <Text strong style={{ fontSize: 18, color: '#f5222d' }}>530.000đ</Text>
                                </Row>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Checkout;