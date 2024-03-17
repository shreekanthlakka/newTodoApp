import { useQuery } from "@tanstack/react-query";
import { getTodos } from "./todoApiServices";

function useGetTodos() {
    const { data: todos, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });
    return { isLoading, todos };
}

export { useGetTodos };
