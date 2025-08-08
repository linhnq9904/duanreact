import { Form, Input, Button, InputNumber, Card, Space, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import { useEdit } from "../hooks/useEdit";
import { useOne } from "../hooks/useOne";
import { useList } from "../hooks/useList";
import Title from "antd/es/typography/Title";

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const nav = useNavigate();

    const { data: product } = useOne("products", id);
    const { data: categories } = useList("categories");

    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                ...product,
                category: product.categoryId, 
            });
        }
    }, [product, form]);

    const editMutation = useEdit(id!);

    const handleSubmit = (values: any) => {
        const payload = {
            ...values,
            categoryId: values.category, 
        };
        delete payload.category;

        editMutation.mutate(payload);
        nav(`/product/detail/${id}`);
    };

    return (
        <>
            <Header />
            <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
                <Card>
                    <Title level={2} style={{ marginBottom: 24 }}>Sửa sản phẩm</Title>
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
                            rules={[{ required: true, message: "Vui lòng nhập link hình ảnh" }]}
                        >
                            <Input placeholder="Nhập link hình ảnh" />
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
                            <Button type="primary" htmlType="submit">
                                Sửa
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default EditProduct;
