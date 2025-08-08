import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

export const useEdit = (id: string | number) => {
    const editProduct = async (values: any) => {
        const res = await axios.put(`http://localhost:3001/products/${id}`, values);
        return res.data;
    };

    const editMutation = useMutation({
        mutationFn: (values: any) => editProduct(values),
        onSuccess: () => {
            message.success("thanh cong");
        },
        onError: () => {
            message.error('that bai')
        }
    });

    return editMutation;
};
