import { Card, Row, Col, Button, Image, Layout, Typography, message } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useList } from "../../hooks/useList";
import { useAddToCart } from "../../hooks/useAddToCart";

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
    const addToCartMutation = useAddToCart();

    const handleAddToCart = (product: Product) => {
        addToCartMutation.mutate({
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            quantity: 1,
            price: 0,
        });
    };

    return (
        <Layout>
            <Header />
            <Content style={{ padding: '50px' }}>
                <Title level={2}>Sản phẩm nổi bật</Title>
                <Row gutter={[16, 16]}>
                    {data?.map((product: Product) => (
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
                                    <Button
                                        type="primary"
                                        icon={<ShoppingCartOutlined />}
                                        onClick={() => handleAddToCart(product)}
                                        loading={addToCartMutation.isPending}
                                    >
                                        Thêm vào giỏ
                                    </Button>
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
                </Row>
            </Content>
        </Layout>
    );
}

export default ProductList;