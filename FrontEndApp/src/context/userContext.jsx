import { createContext, useContext, useReducer } from "react";
import {
    loggedInUserDetailsApi,
    loginApi,
    logoutApi,
} from "../ApiServices/usersAuth/AuthApiServices";

const userContext = createContext();

const initialState = {
    isLoggedIn: false,
    user: {},
    isLoading: false,
    errors: null,
    isAuthenticated: false,
    currentUser: {},
};

function userReducer(state, action) {
    switch (action.type) {
        case "start":
            return { ...state, isLoading: true, errors: null };
        case "login":
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                user: action.payload,
            };
        case "logout":
            return { ...initialState };
        case "getCurrentUserDetails":
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                isAuthenticated: action.isAuthenticated ? true : false,
            };
        // case "isAuth":
        //     return {
        //         ...state,
        //         isAuthenticated: action.payload,
        //         isLoading: false,
        //     };
        case "default":
            return state;
    }
}

function UserContextProvider({ children }) {
    const [{ user, isLoading, errors, isLoggedIn, isAuthenticated }, dispatch] =
        useReducer(userReducer, initialState);

    const login = async (email, password) => {
        try {
            dispatch({ type: "start" });
            const res = await loginApi({ email, password });
            if (!res.success) {
                console.log("res obj ==>", res);
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            if (res.success) {
                localStorage.setItem("token", res.accessToken);
            }
            dispatch({ type: "login", payload: res.user });
            return res;
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error) });
        }
    };

    const logout = async () => {
        try {
            dispatch({ type: "start" });
            const res = await logoutApi();
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            if (res.success) {
                localStorage.setItem("token", null);
            }
            dispatch({ type: "logout" });
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error.message) });
        }
    };

    const getCurrentUserDetails = async () => {
        try {
            dispatch({ type: "start" });
            const res = await loggedInUserDetailsApi();
            console.log("res in is logged in ========> ", res);
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            dispatch({
                type: "getCurrentUserDetails",
                payload: res.user,
                isAuthenticated: res.isAuthenticated,
            });
            // if (res.isAuthenticated) {
            //     dispatch({ type: "isAuth", payload: res.isAuthenticated });
            // }
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error.message) });
        }
    };

    const value = {
        user,
        isLoading,
        isLoggedIn,
        errors,
        login,
        logout,
        getCurrentUserDetails,
        isAuthenticated,
    };
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

function useUser() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("Auth context used outside scope");
    }
    return context;
}

export { UserContextProvider, useUser };
