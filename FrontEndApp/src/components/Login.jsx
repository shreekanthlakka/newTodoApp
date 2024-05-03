import styled from "styled-components";
// import { useLogin } from "../ApiServices/usersAuth/useLogin";
import { useState } from "react";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 15px;
    background: linear-gradient(to right, #000428, #004e92);
`;

const Input = styled.input`
    height: 40px;
    width: 40%;
    font-size: large;
    font-weight: 500;
    text-align: center;
    border-radius: 5px;
`;

const Button = styled.button`
    height: 40px;
    width: 30%;
    padding: 10px;
    margin: 20px;
    background-color: #757ca1;
    color: white;
    font-size: larger;
    font-weight: 600;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
`;

const StyledP = styled.p`
    color: white;
`;

const StyledSpan = styled.span`
    color: white;
    font-size: large;
    font-weight: 600;
    margin: 5px;
`;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { login, isLoading } = useLogin();
    const { login, isLoading, isLoggedIn } = useUser();
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        if (!email && !password) return;
        await login(email, password);
        setEmail("");
        setPassword("");
    }

    if (isLoggedIn) {
        navigate("/dashboard");
        toast.success("You are now logged in!");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
                disabled={isLoading}
            />
            <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
                disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
                Login
            </Button>
            <StyledP>
                dont have an account{" "}
                <Link to="/signup">
                    <StyledSpan>Signup</StyledSpan>
                </Link>
            </StyledP>
        </Form>
    );
}

export default Login;

// const URL = "http://localhost:5000/api/v1";

// async function login(obj) {
//     const res = await fetch(`${URL}/users/login`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(obj),
//     });

//     return await res.json();
// }

// function handleSubmit(e) {
//     e.preventDefault();
//     const obj = {
//         email: e.target[0].value,
//         password: e.target[1].value,
//     };
//     login(obj)
//         .then((data) => console.log("------", data))
//         .catch((err) => console.log(err));
// }
