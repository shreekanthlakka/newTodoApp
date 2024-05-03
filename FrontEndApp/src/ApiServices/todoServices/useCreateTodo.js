import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo as createTodoApi } from "./todoApiServices";

function useCreateTodo() {
    const queryClient = useQueryClient();
    const { mutate: createTodo, isLoading } = useMutation({
        mutationFn: createTodoApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
    });
    return { createTodo, isLoading };
}

export { useCreateTodo };
