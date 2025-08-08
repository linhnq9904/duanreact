import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseDeleteOptions {
    onSuccess?: () => void;
}

export const useDelete = (resource: string, options?: UseDeleteOptions) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string | number) => {
            const res = await fetch(`http://localhost:3001/${resource}/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error(`Không thể xóa ${resource}`);
            }
            return res.json();
        },
        onSuccess: () => {
            // Cập nhật lại cache
            queryClient.invalidateQueries({ queryKey: [resource] });
            // Gọi callback nếu có
            options?.onSuccess?.();
        },
    });

    return mutation;
};