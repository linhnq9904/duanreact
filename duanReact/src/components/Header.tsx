import React from "react";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Input, Badge, Space, Menu, Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { items } = useCart();
    const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    const userMenu = [
        { key: 'Login', label: 'Tài khoản', path: '/login' },
        { key: 'orders', label: 'Đơn hàng', path: '/orders' },
        { key: 'logout', label: 'Đăng xuất' }
    ];

    return (
        <AntHeader style={{ background: '#fff', padding: '0 50px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Row justify="space-between" align="middle" style={{ height: '100%' }}>
                <Col span={4}>
                    <h1
                        style={{ margin: 0, cursor: 'pointer', fontSize: '24px', color: '#1890ff' }}
                        onClick={() => navigate('/')}
                    >
                        Shop Logo
                    </h1>
                </Col>

                <Col span={10}>
                    <Menu mode="horizontal" style={{ border: 'none', justifyContent: 'center' }}>
                        <Menu.Item key="home" onClick={() => navigate('/')}>Trang chủ</Menu.Item>
                        <Menu.Item key="products" onClick={() => navigate('/products')}>Sản phẩm</Menu.Item>
                        <Menu.Item key="categories" onClick={() => navigate('/categories')}>Danh mục</Menu.Item>
                    </Menu>
                </Col>

                <Col span={10}>
                    <Space align="center" size="large" style={{ float: 'right' }}>
                        <Search
                            placeholder="Tìm kiếm sản phẩm..."
                            style={{ width: 300 }}
                            onSearch={(value) => console.log(value)}
                        />
                        <Badge count={cartItemCount} size="small">
                            <Button
                                icon={<ShoppingCartOutlined />}
                                shape="circle"
                                size="large"
                                onClick={() => navigate('/cart')}
                            />
                        </Badge>
                        <Dropdown
                            menu={{
                                items: userMenu.map(item => ({
                                    key: item.key,
                                    label: item.label,
                                    onClick: () => {
                                        if (item.key === "logout") {
                                            handleLogout();
                                        } else {
                                            navigate(item.path || "/");
                                        }
                                    }
                                }))
                            }}
                        >
                            <Button
                                icon={<UserOutlined />}
                                shape="circle"
                                size="large"
                            />
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;