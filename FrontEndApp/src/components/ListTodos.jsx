import styled from "styled-components";
import { useTodos } from "../context/todoContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function ListTodos() {
    const { todos, deleteTodo, updateTodo } = useTodos();

    function handleChecked(todo) {
        const updatedTodoObj = { ...todo, isComplected: !todo.isComplected };
        updateTodo({ id: todo._id, todo: updatedTodoObj });
    }

    return (
        <Container>
            <h3>Your Todos - {todos?.data.length}</h3>
            <table>
                <thead>
                    <tr>
                        <th>status</th>
                        <th>Title</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos?.data.map((todo) => (
                        <tr key={todo._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={todo.isComplected}
                                    onChange={() => handleChecked(todo)}
                                />
                            </td>
                            <td>{todo.title}</td>
                            <td>
                                <button>Edit</button>
                                <button onClick={() => deleteTodo(todo._id)}>
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}

export default ListTodos;

/**
 * 
 * {todos?.data.map((todo) => (
                <div key={todo._id}>
                    <input type="checkbox" />
                    <span>{todo.title}</span>
                    <button>edit</button>
                    <button>delete</button>
                </div>
            ))}
 */
