import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "./AuthApiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            toast.success("You have been logged out successfully");
            navigate("/login");
            queryClient.removeQueries({
                queryKey: ["todos"],
                exact: true,
            });
        },
    });
    return { logout, isLoading };
}

export { useLogout };
