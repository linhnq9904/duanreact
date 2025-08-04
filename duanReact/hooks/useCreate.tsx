import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useCreate = () => {
    const createproduct = async (values: any) => {
        return await axios.post(`http://localhost:3001/products`, values)
    };
    const craeteMutation = useMutation({
        mutationFn: (values: any) => createproduct(values),
        onSuccess: () => {
            message.success("thanh cong");
        }
    });

    return craeteMutation;
};
