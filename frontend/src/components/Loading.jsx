import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Loading() {
    return (
        <Container>
            <h2>Loading...</h2>
        </Container>
    );
}

export default Loading;
