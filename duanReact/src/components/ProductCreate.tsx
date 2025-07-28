import { Form, Input, Button, message, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Header from "./Header";

const ProductCreate = () => {
    const nav = useNavigate();
    const [form] = Form.useForm();

    const createProduct = async (values: any) => {
        const res = await axios.post("http://localhost:3001/products", values);
        return res.data;
    };

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            message.success("Tạo sản phẩm thành công!");
            form.resetFields();
            nav("/products");
        },
        onError: () => {
            message.error("Tạo sản phẩm thất bại!");
        },
    });
    const handleSubmit = async (values: any) => {
        mutation.mutate(values);
    };

    return <>
        <Header />
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
            <h2>Sửa sản phẩm</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: "Vui lòng nhập giá" }, { type: "number", min: 1000, message: "giá phải lơn hơn 1000" }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Link ảnh"
                    name="image"
                    rules={[{ required: true, message: "Vui lòng nhập link ảnh" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={mutation.isPending}
                    >
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>
};

export default ProductCreate;
