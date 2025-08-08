import { Form, Input, Button, InputNumber } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import { useEdit } from "../hooks/useEdit";
import { useOne } from "../hooks/useOne";

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const nav = useNavigate();
    const { data: product } = useOne("products", id);

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
        }
    }, [product, form]);


    const editMutation = useEdit(id!);

    const handleSubmit = (values: any) => {
        editMutation.mutate(values);
        nav(`/product/detail/${id}`)
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
                    >
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>
}

export default EditProduct;