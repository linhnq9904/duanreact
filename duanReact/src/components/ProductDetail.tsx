import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Spin,
    Alert,
    Typography,
    Image,
    Button,
    Row,
    Col,
    Space,
    Divider,
    Popconfirm
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Header from "./Header";
import { useOne } from "../hooks/useOne";
import { useDelete } from "../hooks/useDelete";

const { Title, Text } = Typography;

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data, isLoading, error } = useOne("products", id);

    const { mutate: deleteProduct, isPending } = useDelete("products", {
        onSuccess: () => { navigate("/products") },
    });

    if (isLoading) {
        return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return <Alert type="error" message="Không thể tải sản phẩm" />;
    }

    if (!data) {
        return <Alert type="error" message="Không tìm thấy sản phẩm" />;
    }

    return (
        <>
            <Header />
            <div style={{ maxWidth: 1200, margin: "20px auto", padding: "0 20px" }}>
                <Row gutter={[32, 32]}>
                    <Col span={12}>
                        <Image
                            src={data.image}
                            alt={data.name}
                            width="100%"
                            style={{ borderRadius: 8 }}
                        />
                    </Col>
                    <Col span={12}>
                        <Title level={2}>{data.name}</Title>

                        <Divider />

                        <Title level={3} style={{ color: '#f5222d', marginTop: 0 }}>
                            {data.price.toLocaleString('vi-VN')}đ
                        </Title>

                        <Text style={{ display: 'block', marginBottom: 24 }}>
                            {data.description}
                        </Text>

                        <Space size="middle">
                            <Link to={`/product/edit/${id}`}>
                                <Button type="primary" icon={<EditOutlined />}>
                                    Sửa sản phẩm
                                </Button>
                            </Link>
                            <Popconfirm
                                title="Xóa sản phẩm"
                                description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                                onConfirm={() => deleteProduct(id!)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    loading={isPending}
                                >
                                    Xóa sản phẩm
                                </Button>
                            </Popconfirm>
                        </Space>
                    </Col>
                </Row>

                <Divider />
            </div >
        </>
    );
};

export default ProductDetail;
