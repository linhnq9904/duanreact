import { Button, Form, Input, Typography, Card, Alert } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const { Title, Text } = Typography;

function Register() {
    const [form] = Form.useForm();
    const authMutation = useAuth("Register");
    const nav = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (values: any) => {
        if (values.password !== values.confirmPassword) {
            setErrorMessage("Mật khẩu không khớp!");
            return;
        }

        setErrorMessage("");
        const { confirmPassword, ...dataToSend } = values;
        authMutation.mutate(dataToSend, {
            onSuccess: () => {
                nav('/login');
            },
            onError: () => {
                setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
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
                    <Title level={3}>Đăng ký</Title>
                    <Text type="secondary">Tạo tài khoản để tiếp tục</Text>
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
                        label="Tên đăng nhập"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input placeholder="Tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email không đúng định dạng!' }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Text>Bạn đã có tài khoản? </Text>
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

export default Register;
