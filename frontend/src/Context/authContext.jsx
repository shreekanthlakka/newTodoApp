/*eslint-disable react/prop-types*/

import { createContext, useContext, useEffect, useState } from "react";
import { useLoggedInUser } from "../ApiServices/usersAuth/useLoggedInUser";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const { loggedInUser, isLoading } = useLoggedInUser();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState();

    useEffect(() => {
        setIsAuthenticated(loggedInUser?.isAuthenticated ? true : false);
    }, [loggedInUser]);

    const contextValue = {
        user,
        setUser,
        isAuthenticated,
        isLoading,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuthUser() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuthUser must be used within the AuthContext");
    return context;
}

export { AuthContextProvider, useAuthUser };
