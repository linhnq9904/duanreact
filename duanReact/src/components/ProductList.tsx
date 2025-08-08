import { Card, Row, Col, Button, Image, Layout, Typography, Slider, Space } from "antd";
import { EyeOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import { useState } from "react";

const { Content } = Layout;
const { Title, Text } = Typography;

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

function ProductList() {
    const nav = useNavigate();
    const { data } = useList("products");

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

    const filteredProducts = data?.filter(
        (p: Product) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    return (
        <Layout>
            <Header />
            <Content style={{ padding: '30px 50px' }}>
                <Card style={{ marginBottom: 24 }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={4} style={{ margin: 0 }}>
                            <FilterOutlined /> Lọc theo giá
                        </Title>
                        <Slider
                            range
                            min={0}
                            max={100000}
                            step={5000}
                            value={priceRange}
                            onChange={(val) => setPriceRange(val as [number, number])}
                            tooltip={{ formatter: (val) => `${val?.toLocaleString()}đ` }}
                        />
                        <Space>
                            <Text strong>
                                {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
                            </Text>
                            <Button type="default" onClick={() => setPriceRange([0, 100000])}>
                                Đặt lại
                            </Button>
                        </Space>
                    </Space>
                </Card>

                <Title level={2}>Sản phẩm nổi bật</Title>
                <Row gutter={[16, 16]}>


                    {filteredProducts?.map((product: Product) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Card
                                hoverable
                                cover={(
                                    <Image
                                        alt={product.name}
                                        src={product.image}
                                        preview={false}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                actions={[
                                    <Button
                                        type="link"
                                        icon={<EyeOutlined />}
                                        onClick={() => nav(`/product/detail/${product.id}`)}
                                    >
                                        Chi tiết
                                    </Button>,
                                ]}
                            >
                                <Card.Meta
                                    title={product.name}
                                    description={
                                        <>
                                            <Text strong style={{ color: '#f5222d', fontSize: '16px' }}>
                                                {product.price.toLocaleString('vi-VN')}đ
                                            </Text>
                                            <br />
                                            <Text ellipsis>{product.description}</Text>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            style={{
                                height: 380,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px dashed #d9d9d9",
                                cursor: "pointer"
                            }}
                            onClick={() => nav("/productCreate")}
                        >
                            <PlusOutlined style={{ fontSize: 48, color: "#1890ff" }} />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default ProductList;
