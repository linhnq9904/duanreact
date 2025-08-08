import { Button, Card, Form, Input, Typography, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const { Title, Text } = Typography;

function Login() {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const authMutation = useAuth("Login");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (values: any) => {
        setErrorMessage("");
        authMutation.mutate(values, {
            onSuccess: () => {
                nav('/products');
            },
            onError: () => {
                setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            }
        });
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        }}>
            <Card
                style={{
                    width: 400,
                    padding: '24px 32px',
                    borderRadius: 8,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={3}>Đăng nhập</Title>
                    <Text type="secondary">Vui lòng nhập email và mật khẩu</Text>
                </div>

                {errorMessage && (
                    <Alert
                        message={errorMessage}
                        type="error"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Không được bỏ trống" },
                            {
                                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Email không đúng định dạng"
                            }
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            { required: true, message: "Không được bỏ trống" },
                            { min: 6, message: "Ít nhất 6 ký tự" }
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Text>Chưa có tài khoản? </Text>
                        <Link to="/register">Đăng ký</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
