import { createContext, useContext, useReducer } from "react";
import {
    createTodo,
    deleteTodoById,
    getTodoById,
    getTodos,
    updateATodo,
} from "../ApiServices/todoServices/todoApiServices";

const todoContext = createContext();

const initialState = {
    todos: [],
    isLoading: false,
    errors: null,
    selectedTodo: null,
};

function todoReducer(state, action) {
    switch (action.type) {
        case "start":
            return { ...state, isLoading: true, errors: null };
        case "addTodo":
            return {
                ...state,
                isLoading: false,
                todos: [...state.todos, action.payload],
            };
        case "getTodos":
            return { ...state, isLoading: false, todos: action.payload };
        case "error":
            return { ...state, isLoading: false, errors: action.payload };
        case "selectedTodo":
            return {
                ...state,
                isLoading: false,
                selectedTodo: state.todos.find(
                    (ele) => ele._id === action.payload
                ),
            };
        case "deleteTodo":
            return {
                ...state,
                isLoading: false,
                todos: state.todos.map((ele) => ele._id !== action.payload),
            };
        case "updateTodo":
            return {
                ...state,
                isLoading: false,
                todos: state.todos.map((ele) =>
                    ele._id === action.payload._id ? action.payload : ele
                ),
            };
        case "default":
            return state;
    }
}
function TodoContextProvider({ children }) {
    const [{ todos, isLoading, errors }, dispatch] = useReducer(
        todoReducer,
        initialState
    );

    const addTodo = async (todoObj) => {
        try {
            dispatch({ type: "start" });
            const res = await createTodo(todoObj);
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            dispatch({ type: "addTodo", payload: res.data });
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error.message) });
        }
    };

    const getAllTodos = async () => {
        try {
            dispatch({ type: "start" });
            const res = await getTodos();
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            dispatch({ type: "getTodos", payload: res.data });
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error.message) });
        }
    };

    const getATodo = async (id) => {
        try {
            dispatch({ type: "start" });
            const res = await getTodoById(id);
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            dispatch({ type: "selectedTodo", payload: res.data._id });
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error.message) });
        }
    };

    const deleteTodo = async (id) => {
        try {
            dispatch({ type: "start" });
            const res = await deleteTodoById(id);
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            dispatch({ type: "deleteTodo", payload: res.data._id });
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error.message) });
        }
    };

    const updateTodo = async ({ id, todo }) => {
        try {
            dispatch({ type: "start" });
            const res = await updateATodo(id, todo);
            if (!res.success) {
                throw new Error(
                    JSON.stringify({ status: res.status, message: res.message })
                );
            }
            dispatch({ type: "updateTodo", payload: res.data });
        } catch (error) {
            dispatch({ type: "error", payload: JSON.parse(error.message) });
        }
    };

    const value = {
        todos,
        addTodo,
        getAllTodos,
        getATodo,
        deleteTodo,
        updateTodo,
        isLoading,
        errors,
    };

    return (
        <todoContext.Provider value={value}> {children}</todoContext.Provider>
    );
}

function useTodos() {
    const context = useContext(todoContext);
    if (!context) {
        throw new Error("Context used outside of provider");
    }
    return context;
}

export { TodoContextProvider, useTodos };
