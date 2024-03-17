import { useMutation } from "@tanstack/react-query";
import { registerApi } from "./AuthApiServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useRegister() {
    const navigate = useNavigate();
    const {
        mutate: registerUser,
        isLoading,
        error,
    } = useMutation({
        mutationFn: ({ name, email, password }) =>
            registerApi({ name, email, password }),
        onSuccess: () => {
            toast.success("Registered sucessfully");
            navigate("/login");
        },
    });
    return { registerUser, isLoading, error };
}

export { useRegister };
