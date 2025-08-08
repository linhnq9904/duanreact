import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const authMutation = useAuth("Login");

    const handleSubmit = async (values: any) => {
        nav('/products');
        authMutation.mutate(values);
    }

    return (
        <div>
            <h1>Đăng Nhập</h1>
            <Form
                form={form}
                layout="vertical"
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        { required: true, message: "Không được bỏ trống" },
                        { min: 6, message: "Ít nhất 6 ký tự" }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Link to="/register">Bạn chưa có tài khoản?</Link>
                </Form.Item>

                <Form.Item>
                    <button type="submit">Đăng nhập</button>
                </Form.Item>

            </Form>
        </div>
    );
}

export default Login;
