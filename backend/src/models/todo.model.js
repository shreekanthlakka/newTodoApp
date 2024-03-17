import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isComplected: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
