import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Space, Menu, Button, Dropdown, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    const userMenu = [
        token
            ? { key: "profile", label: "Hồ sơ", path: "/profile" }
            : { key: "login", label: "Đăng nhập", path: "/login" },
        { key: "orders", label: "Đơn hàng", path: "/orders" },
        { key: "cart", label: "Giỏ hàng", path: "/cart" },
        ...(token ? [{ key: "logout", label: "Đăng xuất" }] : []),
    ];

    return (
        <AntHeader
            style={{
                background: "#fff",
                padding: "0 50px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            <Row style={{ width: "100%" }} align="middle">
                <Col span={4}>
                    <Text
                        strong
                        style={{
                            fontSize: "22px",
                            color: "#1890ff",
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                        onClick={() => navigate("/")}
                    >
                    </Text>
                </Col>

                <Col span={10}>
                    <Menu
                        mode="horizontal"
                        style={{
                            border: "none",
                            justifyContent: "center",
                            fontWeight: 500,
                        }}
                        selectable={false}
                    >
                        <Menu.Item key="home" onClick={() => navigate("/")}>
                            Trang chủ
                        </Menu.Item>
                        <Menu.Item key="products" onClick={() => navigate("/products")}>
                            Sản phẩm
                        </Menu.Item>
                        <Menu.Item key="categories" onClick={() => navigate("/categories")}>
                            Danh mục
                        </Menu.Item>
                    </Menu>
                </Col>

                <Col span={10}>
                    <Space size="large" style={{ float: "right" }}>
                        <Dropdown
                            menu={{
                                items: userMenu.map((item) => ({
                                    key: item.key,
                                    label: item.label,
                                    onClick: () => {
                                        if (item.key === "logout") {
                                            handleLogout();
                                        } else {
                                            navigate(item.path || "/");
                                        }
                                    },
                                })),
                            }}
                            placement="bottomRight"
                        >
                            <Button
                                icon={<UserOutlined />}
                                shape="circle"
                                size="large"
                                type="default"
                            />
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
