import { Link } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
`;

const H3 = styled.h3`
    margin: 10px;
    padding: 10px;
`;

function HomePage() {
    return (
        <div>
            <Header>
                <Link style={{ textDecorationLine: "none" }} to="/login">
                    <H3>Login</H3>
                </Link>
                <Link style={{ textDecorationLine: "none" }} to="/signup">
                    <H3>SignUp</H3>
                </Link>
            </Header>
            <Container>
                <h2>Welcome ! Signup or Login to view your todos</h2>
            </Container>
        </div>
    );
}

export default HomePage;
