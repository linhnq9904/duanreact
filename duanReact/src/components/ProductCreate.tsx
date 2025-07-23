import { Form, Input, Button, message, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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

    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <h2>Tạo sản phẩm mới</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ name: "", price: 0 }}
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="Price"
                    rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                >
                    <InputNumber
                        placeholder="Nhập giá"
                        min={1}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="Image"
                    rules={[{ required: true, message: "Vui lòng nhập hình ảnh" }]}
                >
                    <Input
                        placeholder="Nhập link hình ảnh"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Tạo sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductCreate;
