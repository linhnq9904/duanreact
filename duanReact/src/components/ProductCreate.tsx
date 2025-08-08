import { Form, Input, Button, InputNumber, Card, Typography, Space, Select, message, notification } from "antd";
import Header from "./Header";
import { useCreate } from "../hooks/useCreate";
import { useList } from "../hooks/useList";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ProductCreate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { mutate } = useCreate();
    const { data: categories } = useList("categories");

    const handleSubmit = (values: any) => {
        mutate(values, {
            onSuccess: () => {
                notification.success({
                    message: "Thêm sản phẩm thành công",
                    description: "Sản phẩm của bạn đã được lưu vào hệ thống.",
                    placement: "topRight",
                    duration: 2
                });
                setTimeout(() => {
                    navigate("/products");
                }, 1000);
            },
            onError: () => {
                message.error("Có lỗi xảy ra khi thêm sản phẩm!");
            }
        });
    };

    return (
        <>
            <Header />
            <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
                <Card>
                    <Title level={2} style={{ marginBottom: 24 }}>Thêm sản phẩm mới</Title>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                        >
                            <Input size="large" placeholder="Nhập tên sản phẩm" />
                        </Form.Item>

                        <Space size="large" style={{ display: 'flex' }}>
                            <Form.Item
                                label="Giá sản phẩm"
                                name="price"
                                rules={[
                                    { required: true, message: "Vui lòng nhập giá" },
                                    { type: "number", min: 1000000, message: "Giá phải lớn hơn 1000000đ" },
                                    { type: "number", max: 100000000, message: "Giá phải nhỏ hơn 100000000" }
                                ]}
                                style={{ flex: 1 }}
                            >
                                <InputNumber
                                    size="large"
                                    style={{ width: '100%' }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                                    placeholder="Nhập giá sản phẩm"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Danh mục"
                                name="category"
                                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                                style={{ flex: 1 }}
                            >
                                <Select
                                    size="large"
                                    placeholder="Chọn danh mục"
                                    options={categories?.map((cat: any) => ({
                                        value: cat.id,
                                        label: cat.name
                                    }))}
                                />
                            </Form.Item>
                        </Space>

                        <Form.Item
                            label="Hình ảnh sản phẩm"
                            name="image"
                            rules={[{ required: true, message: "Vui lòng tải lên hình ảnh sản phẩm" }]}
                        >
                            <Input placeholder="Nhập Link hình ảnh"></Input>
                        </Form.Item>

                        <Form.Item
                            label="Mô tả sản phẩm"
                            name="description"
                            rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
                        >
                            <Input.TextArea
                                rows={6}
                                size="large"
                                placeholder="Nhập mô tả chi tiết về sản phẩm"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button type="primary" size="large" htmlType="submit">
                                    Thêm sản phẩm
                                </Button>
                                <Button size="large" onClick={() => form.resetFields()}>
                                    Làm mới
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default ProductCreate;
