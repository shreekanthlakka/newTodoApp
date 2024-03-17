const URI = "http://localhost:5000/api/v1";

const loginApi = async ({ email, password }) => {
    try {
        const res = await fetch(`${URI}/users/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            throw new Error("Server response was not OK");
        }
        const data = await res.json();
        // console.log("data => ", data);
        return data.success ? data.user : null;
    } catch (error) {
        console.log("error in  api call", error.message);
    }
};

const registerApi = async (obj) => {
    // const { name, email, password } = obj;
    try {
        const res = await fetch(`${URI}/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        if (!res.ok) {
            throw new Error("Server response was not OK");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in  api call", error.message);
    }
};

const logoutApi = async () => {
    try {
        const res = await fetch(`${URI}/users/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Server response was not OK");
        }
        return await res.json();
    } catch (error) {
        console.log("error in  api call", error.message);
    }
};

const loggedInUserDetailsApi = async () => {
    try {
        const res = await fetch(`${URI}/users/getloggedinuser`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Server response was not OK");
        }
        const data = await res.json();
        return data?.isAuthenticated ? data : null;
    } catch (error) {
        console.log("error in  api call", error.message);
    }
};

// loginApi({ email: "three@gmail.com", password: "123456" });

export { loginApi, registerApi, logoutApi, loggedInUserDetailsApi };

/**
 * 
    const loginApi = async (email, password) => {
    try {
        const res = await fetch(`${URI}/users/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            throw new Error("Server response was not OK");
        }
        const data = await res.json();
    } catch (error) {
        console.log("error in  api call", error.message);
    }
};

 * 
 */
