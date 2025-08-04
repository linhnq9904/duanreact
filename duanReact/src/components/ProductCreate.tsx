import { Form, Input, Button, InputNumber, Upload, Card, Typography, Space, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Header from "./Header";
import { useCreate } from "../../hooks/useCreate";

const { Title } = Typography;

const ProductCreate = () => {
    const [form] = Form.useForm();
    const { mutate } = useCreate();

    const handleSubmit = async (values: any) => {
        mutate(values)
    }

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
                                    { type: "number", min: 1000, message: "Giá phải lớn hơn 1000đ" }
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
                                    options={[
                                        { value: 'electronics', label: 'Điện tử' },
                                        { value: 'clothing', label: 'Thời trang' },
                                        { value: 'books', label: 'Sách' }
                                    ]}
                                />
                            </Form.Item>
                        </Space>

                        <Form.Item
                            label="Hình ảnh sản phẩm"
                            name="image"
                            rules={[{ required: true, message: "Vui lòng tải lên hình ảnh sản phẩm" }]}
                        >
                            <Upload
                                listType="picture-card"
                                maxCount={1}
                                beforeUpload={() => false}
                            >
                                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                            </Upload>
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
