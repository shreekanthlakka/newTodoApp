import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import HomePage from "./components/HomePage";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./Context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Dashboard";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                <BrowserRouter>
                    <Routes>
                        <Route index path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 1500,
                        },
                        error: {
                            duration: 2500,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "white",
                            color: "gray",
                        },
                    }}
                />
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;
