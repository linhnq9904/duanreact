import { useNavigate, useParams } from "react-router-dom";
import { Spin, Alert, Typography, Image, Button, Row, Col, Card, InputNumber, Space, Rate, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";

const { Title, Text } = Typography;

const fetchProductById = async (id: string) => {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
    return res.json();
};

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id!),
        enabled: !!id,
    });

    if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
    if (isError || !data) return <Alert type="error" message="Không thể tải sản phẩm" />;

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
                        <Rate disabled defaultValue={4.5} />
                        <Text type="secondary" style={{ marginLeft: 8 }}>(150 đánh giá)</Text>

                        <Divider />

                        <Title level={3} style={{ color: '#f5222d', marginTop: 0 }}>
                            {data.price.toLocaleString('vi-VN')}đ
                        </Title>

                        <Text style={{ display: 'block', marginBottom: 24 }}>
                            {data.description}
                        </Text>

                        <Space size="large" style={{ marginBottom: 24 }}>
                            <Text>Số lượng:</Text>
                            <InputNumber min={1} defaultValue={1} />
                        </Space>

                        <Space size="large">
                            <Button
                                type="primary"
                                size="large"
                                icon={<ShoppingCartOutlined />}
                            >
                                Thêm vào giỏ
                            </Button>
                            <Button size="large">Mua ngay</Button>
                        </Space>
                    </Col>
                </Row>

                <Divider />

                <Card title="Thông tin chi tiết" style={{ marginTop: 32 }}>
                    <Text>{data.description}</Text>
                </Card>
            </div>
        </>
    );
};

export default ProductDetail;
