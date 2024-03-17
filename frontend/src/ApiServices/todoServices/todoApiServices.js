const URI = "http://localhost:5000/api/v1";

const getTodos = async () => {
    try {
        const res = await fetch(`${URI}/todos`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("failed to fetch todos");
        const data = await res.json();
        // console.log("------->", data);
        return data ? data : [];
    } catch (error) {
        console.log(error);
    }
};

const createTodo = async (todoObj) => {
    try {
        const res = await fetch(`${URI}/todos`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todoObj),
        });
        if (!res.ok) throw new Error("failed to fetch todos");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const updateATodo = async ({ id, updatedTodoObj }) => {
    try {
        const res = await fetch(`${URI}/todos/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodoObj),
        });
        if (!res.ok) throw new Error("failed to fetch todos");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getTodoById = async (id) => {
    try {
        const res = await fetch(`${URI}/todos/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("failed to fetch todos");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const deleteTodoById = async (id) => {
    try {
        const res = await fetch(`${URI}/todos/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("failed to fetch todos");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { getTodos, createTodo, updateATodo, getTodoById, deleteTodoById };

/**
 * 
 
 try {
        const res = await fetch(`${URI}/todos`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("failed to fetch todos");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }

 * 
 */
