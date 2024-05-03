import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import { TodoContextProvider } from "./context/todoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <TodoContextProvider>
                <App />
            </TodoContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
