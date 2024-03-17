import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoById } from "./todoApiServices";
import toast from "react-hot-toast";

function useDeleteTodo() {
    const queryClient = useQueryClient();
    const { mutate: deleteTodo, isLoading } = useMutation({
        mutationFn: (id) => deleteTodoById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
            toast.success("todo deleted sucessfully");
        },
    });
    return { deleteTodo, isLoading };
}

export { useDeleteTodo };
