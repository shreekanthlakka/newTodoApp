import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { createToken } from "../utils/createToken.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { generateRefreshandAccessToken } from "../utils/generateTokens.js";
import mailHealper from "../utils/emailHealper.js";
import { validationResult } from "express-validator";
import crypto from "crypto";

const register = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }

    // if (
    //     [fullname, username, email, password].some((ele) => ele?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required");
    // }
    // const existedUser = await User.findOne({
    //     $or: [{ email }],
    // });
    // if (existedUser) {
    //     throw new ApiError(409, `${email || username} is already in use`);
    // }

    // const { name, email, password } = req.body;
    const user = await User.create(req.body);
    if (!user) {
        throw new ApiError(407, "failed to create new User");
    }
    res.status(200).json(
        new ApiResponce(201, user, "User registered sucessfully")
    );
});

const login = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ApiError(400, "bad request", errors.array()));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid Email or Password");
    }
    const isValidPassword = await user.isValidatePasswords(password);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid Email or Password");
    }

    await createToken(user._id, res);
});

const logout = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+accessToken");
    user.accessToken = null;
    await user.save({ validateBeforeSave: false });
    const options = {
        httpOnly: true,
        // secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponce(200, {}, "User logged Out"));
});

const loggedInUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
        throw new ApiError(402, "failed to fetch user data or not logged in");
    }
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        isAuthenticated: true,
        session: {
            refreshToken,
        },
        user,
    });
});

const generateRefreshToken = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("+refreshToken");
    if (!user) {
        throw new ApiError(401, "Invalid token or cookie provided ");
    }
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        isAuthenticated: true,
        session: {
            refreshToken,
        },
        user,
    });
});

const forgotpassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Email does not exist!");
    }

    // ?  Generate OTP and save it on the users document

    const resetToken = await user.getForgotPasswordToken();

    await user.save({ validateBeforeSave: false });

    const urlmsg = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/users/password/reset/${resetToken}`;

    const options = {
        email,
        subject: "Reset Password",
        message: urlmsg,
    };

    try {
        mailHealper(options);
        res.status(200).json({
            success: true,
            message: "An email has been sent to your email",
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: false });
        return new ApiError("404", error.message);
    }
});

const resetpassword = asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    console.log("token", token);
    const hashedtoken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        forgotPasswordToken: hashedtoken,
        forgotPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
        throw new ApiError(405, "Invalid token or expired one");
    }
    if (req.body.password !== req.body.confirmpassword) {
        throw new ApiError(
            401,
            "password and confirmpassword fields didnt match"
        );
    }

    user.password = req.body.password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();
    createToken(user._id, res);
});

export {
    register,
    login,
    logout,
    loggedInUserDetails,
    forgotpassword,
    resetpassword,
    generateRefreshToken,
};
