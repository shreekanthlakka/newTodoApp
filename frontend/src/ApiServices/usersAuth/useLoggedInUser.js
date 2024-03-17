import { useQuery } from "@tanstack/react-query";
import { loggedInUserDetailsApi } from "./AuthApiServices";

function useLoggedInUser() {
    const { data: loggedInUser, isLoading } = useQuery({
        queryKey: ["loggedInUser"],
        queryFn: loggedInUserDetailsApi,
    });
    return { loggedInUser, isLoading };
}

export { useLoggedInUser };
