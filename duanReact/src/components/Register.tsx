import { Button, Form, Input } from 'antd'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form] = Form.useForm();
    const authMutation = useAuth("Register");
    const nav = useNavigate();

    const handleSubmit = async (values: any) => {
        nav('/login');  
        authMutation.mutate(values);
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
                    >
                        đăng kí
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Register
