// import { useLogout } from "../ApiServices/usersAuth/useLogout";
// import { useAuthUser } from "../Context/authContext";
import { useUser } from "../context/userContext";

// const URL = "http://localhost:5000/api/v1";

function Logout() {
    // const { setUser } = useAuthUser();
    // const { logout } = useLogout();
    const { logout } = useUser();

    function handleClick() {
        logout();
        // setUser(null);
    }

    return <button onClick={handleClick}>Logout</button>;
}

export default Logout;

/**
 * 
 * function handleClick() {
        async function logoutcall() {
            const response = await fetch(`${URL}/users/logout`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            return await response.json();
        }
        logoutcall();
    }
 * 
 */
