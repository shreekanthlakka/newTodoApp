import { Router } from "express";
import { checkSchema, body } from "express-validator";
import {
    login,
    logout,
    register,
    loggedInUserDetails,
    forgotpassword,
    resetpassword,
    generateRefreshToken,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { userValidationSchema } from "../../validationSchemas/user.validationSchema.js";

const router = Router();

router.route("/register").post(checkSchema(userValidationSchema), register);
router
    .route("/login")
    .post(
        body("email").trim().notEmpty().exists().isEmail(),
        body("password").trim().notEmpty().exists(),
        login
    );
router.route("/logout").post(isLoggedIn, logout);
router.route("/getloggedinuser").get(isLoggedIn, loggedInUserDetails);
router.route("/getRefreshToken").get(isLoggedIn, generateRefreshToken);
//
router.route("/forgotpassword").post(forgotpassword);
router.route("/password/reset/:token").post(resetpassword);

export default router;
