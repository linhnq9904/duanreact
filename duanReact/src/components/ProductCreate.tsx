import { Form, Input, Button, message, InputNumber } from "antd";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../hooks/useCreate";

const ProductCreate = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const mutation = useCreate("products");

    const handleSubmit = async (values: any) => {
        mutation.mutate(values, {
            onSuccess: () => {
                message.success("Tạo sản phẩm thành công");
                nav("/products");
            },
            onError: () => {
                message.error("Tạo sản phẩm thất bại");
            },
        });
    };

    return (
        <>
            <Header />
            <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
                <h2>Thêm sản phẩm</h2>
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
                        rules={[
                            { required: true, message: "Vui lòng nhập giá" },
                            { type: "number", min: 1000, message: "Giá phải lớn hơn 1000" },
                        ]}
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
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default ProductCreate;
