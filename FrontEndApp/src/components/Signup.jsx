import styled from "styled-components";
// import { useRegister } from "../ApiServices/usersAuth/useRegister";
import { useState } from "react";
import { registerApi } from "../ApiServices/usersAuth/AuthApiServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 10px;
    background-color: #d3d6e6;
`;

const Input = styled.input`
    height: 40px;
    width: 65%;
    font-size: large;
    font-weight: 500;
    text-align: center;
    border-radius: 5px;
`;

const Button = styled.button`
    height: 40px;
    width: 40%;
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

function Signup() {
    // const { registerUser, isLoading } = useRegister();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const obj = {
            name,
            email,
            password,
        };
        // console.log(obj);
        // registerUser(obj);
        setIsLoading(true);
        registerApi(obj)
            .then((user) => {
                if (user.data.success) {
                    toast.success("Registered sucessfully");
                    navigate("/login");
                    setIsLoading(false);
                }
            })
            .catch(() => {
                toast.error("Error in registration!");
                setIsLoading(false);
            });
    }

    return (
        <Form>
            <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="name"
                disabled={isLoading}
            />
            <Input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email"
                disabled={isLoading}
            />
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password"
                disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
                SignUp
            </Button>
        </Form>
    );
}

export default Signup;

/**
 * 
 *  async function register(obj) {
        const res = await fetch(`${URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
        });

        return await res.json();
    }
    function handleSubmit(e) {
        e.preventDefault();

        const obj = {
            fullname: e.target["fullname"].value,
            username: e.target["username"].value,
            email: e.target["email"].value,
            password: e.target["password"].value,
        };
        register(obj)
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    }

 * 
 */
