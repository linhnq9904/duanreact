import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useEdit = (id: string | number) => {
    const editProduct = async (values: any) => {
        return await axios.post(`http://localhost:3001/products/${id}`, values)
    };
    const editMutation = useMutation({
        mutationFn: (values: any) => editProduct(values),
        onSuccess: () => {
            message.success("thanh cong");
        }
    });

    return editMutation;
};
