import express, { urlencoded } from "express";
import cookieparser from "cookie-parser";
import morgan from "morgan";
const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieparser());
app.use(express.static("public"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
app.use(morgan("tiny"));

import userRoute from "./routes/user.routes.js";
import todoRoute from "./routes/todo.routes.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/todos", todoRoute);

export { app };
