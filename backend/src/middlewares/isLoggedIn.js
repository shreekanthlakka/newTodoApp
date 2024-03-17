import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        // console.log("token-------------------------", req.cookies);
        if (!token) {
            throw new ApiError(401, "Not logged in! or invalid tokens");
        }
        const decodedId = jwt.verify(token, process.env.SECRET);

        const user = await User.findById(decodedId).select(
            "-password -refreshToken"
        );
        if (!user) {
            throw new ApiError(401, "User not found!");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

const customRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(403, `not authorized to access this role`)
            );
        }
        next();
    };
};

export { isLoggedIn, customRole };
