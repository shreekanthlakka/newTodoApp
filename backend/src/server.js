import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import { app } from "./app.js";
import { connectWithDB } from "./db/connectWithDB.js";

connectWithDB();

app.listen(process.env.PORT || 8000, () =>
    console.log(`Server is up and running on port : ${process.env.PORT}`)
);
