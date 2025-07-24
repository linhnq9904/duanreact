import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import Header from "./Header";

// interface Users {
//     id: string;
//     name: string;
//     email: string;
// }

function UserList() {
    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3001/users");
        return res.json();
    };
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });
    console.log(data, isLoading, error);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
    ];
    return (
        <div>
            < Header />
            {error && <p>Error: {error.message}</p>}
            <Table
                dataSource={data}
                columns={columns}
                rowKey={"id"}
                loading={isLoading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}

export default UserList;