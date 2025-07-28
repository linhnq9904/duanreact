import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEdit = (resource: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ id, data }: { id: string, data: any }) => {
            const res = await fetch(`http://localhost:3001/${resource}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Sua thất bại");
            }

            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [resource] });
        },
    });

    return mutation;
};
