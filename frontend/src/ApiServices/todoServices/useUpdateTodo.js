import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateATodo } from "./todoApiServices";
import toast from "react-hot-toast";

function useUpdateTodo() {
    const queryClient = useQueryClient();
    const { mutate: updateTodo, isLoading } = useMutation({
        mutationFn: ({ id, updatedTodoObj }) =>
            updateATodo({ id, updatedTodoObj }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
            console.log("updated data", data);
            toast.success("Task Updated Successfully");
        },
    });
    return { updateTodo, isLoading };
}
export { useUpdateTodo };
