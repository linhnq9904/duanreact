import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreate = (resource: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await fetch(`http://localhost:3001/${resource}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Tạo mới thất bại");
            }

            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [resource] });
        },
    });

    return mutation;
};
