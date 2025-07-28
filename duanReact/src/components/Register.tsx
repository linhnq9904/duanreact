import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

function Register() {
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
            nav("/login");
        },
        onError: () => {
            message.error("loi")
        }
    })
    const handleSubmit = async (values: any) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(values.password, salt);

        const newValues = {
            ...values,
            password: hashedPassword,
        };

        mutation.mutate(newValues);
    }
    return (
        <div>
            <h1>Đăng kí</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="tên đăng nhập"
                    name="name"
                    rules={[{ required: true, message: "không dc bỏ trống" }]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    label="Email"
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
                    rules={[{ required: true, message: "không dc bỏ trống" }]}
                >
                    <Input type='password'></Input>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={mutation.isPending}
                    >
                        đăng kí
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Register
