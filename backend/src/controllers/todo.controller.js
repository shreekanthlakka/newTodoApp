import { asyncHandler } from "../utils/asyncHandler.js";
import Todo from "../models/todo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { validationResult } from "express-validator";

const createNewNote = asyncHandler(async (req, res, next) => {
    // if (!title && !description)
    //     throw new ApiError(400, "Please provide title and description");
    // if (!req.user) throw new ApiError(404, "Login first to add a Todo");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }

    const { title, description } = req.body;
    const createdTodo = await Todo.create({
        title,
        description,
        owner: req.user._id,
    });
    res.status(201).json(new ApiResponce(201, createdTodo, "new todo created"));
});

const getAllNotes = asyncHandler(async (req, res, next) => {
    const allNotes = await Todo.find({ owner: req.user._id }).populate({
        path: "owner",
        model: "User",
        select: ["name", "email"],
    });
    const data = allNotes?.length === 0 ? [] : allNotes;
    res.status(200).json(
        new ApiResponce(
            200,
            data,
            "successfully got the todos of the logged in user"
        )
    );
});

// routes based on /todo/:id

const getNote = asyncHandler(async (req, res, next) => {
    const todo = await Todo.findById(req.params.id).populate({
        path: "owner",
        model: "User",
        select: "username",
    });
    if (!todo) {
        throw new ApiError(404, "todo not found");
    }
    res.status(200).json(new ApiResponce(200, todo));
});

const updateTodo = asyncHandler(async (req, res, next) => {
    // const { description, title } = req.body;
    // if ((!title, !description)) {
    //     throw new ApiError("Provide title and description");
    // }
    const updatedtodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!updatedtodo) {
        throw new ApiError(500, "Server Error while updating todo");
    }
    res.status(201).json(
        new ApiResponce(200, updatedtodo, "updated sucessfully")
    );
});

const deleteTodo = asyncHandler(async (req, res, next) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
        throw new ApiError(404, "No todo with this id found!");
    }
    res.status(200).json(new ApiResponce(200, null, "Deleted Successfully"));
});

export { getAllNotes, createNewNote, getNote, updateTodo, deleteTodo };
