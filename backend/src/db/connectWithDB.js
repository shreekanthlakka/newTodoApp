import mongoose from "mongoose";

export const connectWithDB = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((data) => {
            console.log(
                "👍👍Database connected successfully at host : ",
                data.connection.host
            );
        })
        .catch((err) => {
            console.log("ERROR CONNECTING DB", err);
        });
};
