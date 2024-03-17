/*eslint-disable react/prop-types*/

import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../Context/authContext";
// import { useQueryClient } from "@tanstack/react-query";

function ProtectedRoute({ children }) {
    // const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuthUser();
    if (isLoading) <Loading />;

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate, isLoading]);

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
