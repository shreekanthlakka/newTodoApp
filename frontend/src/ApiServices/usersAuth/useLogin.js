import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./AuthApiServices";
import toast from "react-hot-toast";
import { useAuthUser } from "../../Context/authContext";
import { useNavigate, Link } from "react-router-dom";

function useLogin() {
    const navigate = useNavigate();
    const { setUser } = useAuthUser();
    const {
        mutate: login,
        isLoading,
        error,
    } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (data) => {
            navigate("/dashboard");
            toast.success("logged in successfully");
            setUser(data);
        },
        onError: (err) => toast.error(err.message || "Something went wrong"),
    });
    return { login, isLoading, error };
}

export { useLogin };
