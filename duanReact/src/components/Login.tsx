import { useMutation } from '@tanstack/react-query';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form] = Form.useForm();
    const nav = useNavigate();

    const login = async (values: any) => {
        const res = await axios.post(`http://localhost:3001/login`, {
            params: {
                email: values.email,
                password: values.password
            }
        });
        const user = res.data[0];
        if (!user) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }
        return user;
    };

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            localStorage.setItem("user", JSON.stringify(user));
            form.resetFields();
            nav("/products");
            console.log(user);
        },
        onError: () => {
            message.error("Sai email hoặc mật khẩu");
        }
    });

    const handleSubmit = (values: any) => {
        mutation.mutate(values);
    };

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
                    <button type="submit">Đăng nhập</button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
