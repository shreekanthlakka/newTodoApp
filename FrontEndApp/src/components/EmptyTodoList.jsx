/*eslint-disable react/prop-types*/

import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    font-weight: 500;
`;

function EmptyTodoList({ message }) {
    return (
        <Container>
            <h2>{message}</h2>
        </Container>
    );
}

export default EmptyTodoList;
