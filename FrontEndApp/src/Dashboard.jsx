// import { useLoggedInUser } from "./ApiServices/usersAuth/useLoggedInUser";
// import { useLogout } from "./ApiServices/usersAuth/useLogout";
import Header from "./components/Header";
import Todo from "./components/Todo";
import styled from "styled-components";
import { useUser } from "./context/userContext";
const Button = styled.button`
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
`;

function Dashboard() {
    // const { loggedInUser } = useLoggedInUser();
    // const { logout } = useLogout();
    const { user, logout } = useUser();
    return (
        <div>
            <Header>
                <p>
                    Welcome
                    <strong> {user.name}</strong>
                </p>
                <Button onClick={logout}>Logout</Button>
            </Header>
            {/* <Layout /> */}
            <Todo />
        </div>
    );
}

export default Dashboard;
