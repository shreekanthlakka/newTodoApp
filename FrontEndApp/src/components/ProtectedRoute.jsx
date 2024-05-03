/*eslint-disable react/prop-types*/

import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
// import { useAuthUser } from "../Context/authContext";
import { useUser } from "../context/userContext";
// import { useQueryClient } from "@tanstack/react-query";

function ProtectedRoute({ children }) {
    // const queryClient = useQueryClient();
    const navigate = useNavigate();
    // const { isAuthenticated, isLoading } = useAuthUser();
    const { isAuthenticated, getCurrentUserDetails, isLoading } = useUser();
    if (isLoading) <Loading />;

    useEffect(() => {
        async function getUserDetails() {
            await getCurrentUserDetails();
            if (!isLoading && !isAuthenticated) {
                navigate("/");
            }
        }
        getUserDetails();
    }, [isAuthenticated, navigate, isLoading, getCurrentUserDetails]);

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
