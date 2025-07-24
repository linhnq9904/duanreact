import { Form, Input, Button, message, InputNumber } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchProductById = async (id: string) => {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
    return res.json();
};

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id!),
        enabled: !!id,
    });
    const updateProduct = async ({ id, values }: { id: string; values: any }) => {
        const res = await fetch(`http://localhost:3001/products/${id}`, { method: "PUT", body: JSON.stringify(values), });
        return res.json();
    };

    const mutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            message.success("Cập nhật sản phẩm thành công");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/products");
        },
        onError: () => {
            message.error("Lỗi khi cập nhật sản phẩm");
        },
    });

    useEffect(() => {
        if (data) form.setFieldsValue(data);
    }, [data, form]);

    const onFinish = (values: any) => {
        if (id) mutation.mutate({ id, values });
    };
    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
            <h2>Sửa sản phẩm</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                disabled={isLoading || mutation.isPending}
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
                    <InputNumber min={0} style={{ width: "100%" }} />
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
    );
}

export default EditProduct;


