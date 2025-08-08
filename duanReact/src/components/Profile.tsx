import { Card, Layout, Typography, Avatar, Spin, Divider } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Header from "./Header";
import { useProfile } from "../hooks/useProfile";

const { Content } = Layout;
const { Title, Text } = Typography;

function Profile() {
    const { data: user, isLoading } = useProfile();

    if (isLoading) {
        return (
            <Layout>
                <Header />
                <Content style={{ padding: '50px', textAlign: 'center' }}>
                    <Spin size="large" tip="Đang tải thông tin..." />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ minHeight: '65vh', background: '#f5f7fa' }}>
            <Header />
            <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
                <Card
                    style={{
                        width: 420,
                        borderRadius: 12,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                        paddingTop: 20
                    }}
                >
                    <Avatar
                        size={100}
                        icon={<UserOutlined />}
                        style={{
                            backgroundColor: '#1890ff',
                            marginBottom: 16
                        }}
                    />

                    <Title level={3} style={{ marginBottom: 0 }}>
                        {user?.name || "Người dùng"}
                    </Title>
                    <Text type="secondary">Thành viên từ 2025</Text>

                    <Divider />

                    <div style={{ textAlign: 'left', padding: '0 20px' }}>
                        <Title level={5}><UserOutlined /> Họ và tên</Title>
                        <Text>{user?.name}</Text>
                        <Divider />

                        <Title level={5}><MailOutlined /> Email</Title>
                        <Text>{user?.email}</Text>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
}

export default Profile;
