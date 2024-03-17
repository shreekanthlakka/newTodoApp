import { useLoggedInUser } from "./ApiServices/usersAuth/useLoggedInUser";
import { useLogout } from "./ApiServices/usersAuth/useLogout";
import Header from "./components/Header";
import Todo from "./components/Todo";
import styled from "styled-components";
const Button = styled.button`
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
`;

function Dashboard() {
    const { loggedInUser } = useLoggedInUser();
    const { logout } = useLogout();
    return (
        <div>
            <Header>
                <p>
                    Welcome
                    <strong> {loggedInUser?.user.name}</strong>
                </p>
                <Button onClick={logout}>Logout</Button>
            </Header>
            {/* <Layout /> */}
            <Todo />
        </div>
    );
}

export default Dashboard;
