import { useMutation } from '@tanstack/react-query';
import { Form, Input, message } from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const login = async (values: any) => {
        const res = await axios.post(`http://localhost:3001/users`, values);
        return res.data;
    }
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            form.resetFields();
            nav("/products");
        },
        onError: () => {
            message.error("loi")
        }
    })
    const handleSubmit = async (values: any) => {
        mutation.mutate(values);
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
                    label="tên đăng nhập"
                    name="email"
                    rules={[{ required: true, message: "không dc bỏ trống" }, {
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "không đúng dịnh dạng"
                    }]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    label="mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "không dc bỏ trống" }, {
                        type: "number", min: 6, message: "ít nhất 6 kí tự"
                    }]}
                >
                    <Input type='password'></Input>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
