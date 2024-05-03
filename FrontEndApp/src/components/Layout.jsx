import { Link } from "react-router-dom";
// import { useAuthUser } from "../Context/authContext";

function Layout() {
    // const {} = useAuthUser();
    return (
        <div>
            {true && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">SignUp</Link>
                </>
            )}
            <Link to="/logout">Logout</Link>
        </div>
    );
}

export default Layout;
