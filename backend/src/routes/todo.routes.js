import express from "express";
import { checkSchema, param } from "express-validator";
import {
    createNewNote,
    getAllNotes,
    getNote,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { todoValidationSchema } from "../../validationSchemas/todo.validationSchema.js";

const router = express.Router();

router
    .route("/")
    .get(isLoggedIn, getAllNotes)
    .post(checkSchema(todoValidationSchema), isLoggedIn, createNewNote);
router
    .route("/:id")
    .get(param("id").isMongoId(), isLoggedIn, getNote)
    .put(param("id").isMongoId(), isLoggedIn, updateTodo)
    .delete(param("id").isMongoId(), isLoggedIn, deleteTodo);

export default router;
