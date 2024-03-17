import styled from "styled-components";
import CreateTodo from "./CreateTodo";
import ListTodos from "./ListTodos";
import { useGetTodos } from "../ApiServices/todoServices/useGetTodos";
import EmptyTodoList from "./EmptyTodoList";

const Main = styled.main`
    align-content: center;
`;

function Todo() {
    const { todos } = useGetTodos();
    return (
        <Main>
            <CreateTodo />
            {todos?.data.length > 0 ? (
                <ListTodos />
            ) : (
                <EmptyTodoList message="your todo list is empty! add your first todo" />
            )}
        </Main>
    );
}

export default Todo;
