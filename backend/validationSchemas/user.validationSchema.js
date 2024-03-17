import User from "../src/models/user.model.js";

const userValidationSchema = {
    name: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "name field cannot be empty",
        },
        exists: {
            errorMessage: "name filed is required",
        },
    },
    email: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "email field cannot be left blank",
        },
        exists: {
            errorMessage: "email field is required",
        },
        isEmail: {
            errorMessage: "Please provide a valid email address",
        },
        custom: {
            options: async function (val) {
                const user = await User.findOne({ email: val });
                if (user) throw new Error("User with this email already exist");
                return true;
            },
        },
    },
    password: {
        in: ["body"],
        trim: true,
        notEmpty: true,
        exists: {
            errorMessage: "password field is required",
        },
    },
};

export { userValidationSchema };
