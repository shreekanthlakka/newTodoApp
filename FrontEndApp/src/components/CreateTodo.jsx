import { useState } from "react";
import styled from "styled-components";
// import { useCreateTodo } from "../ApiServices/todoServices/useCreateTodo";
import toast from "react-hot-toast";
import { useTodos } from "../context/todoContext";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px;
`;

function CreateTodo() {
    // const { createTodo, isLoading } = useCreateTodo();
    const { addTodo, isLoading } = useTodos();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        const todoObj = {
            title,
            description,
        };
        // console.log(todoObj);
        // createTodo(todoObj, {
        //     onSuccess: () => {
        //         // console.log("craeed todo", data);
        //         toast.success("Created Todo Successfully!");
        //     },
        // });
        addTodo(todoObj).then(() => toast.success("Added Todo Successfully!"));
        setTitle("");
        setDescription("");
    }
    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
            />
            <label htmlFor="desc">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="desc"
                disabled={isLoading}
            />
            <Button type="submit">Add Todo</Button>
        </Form>
    );
}

export default CreateTodo;
