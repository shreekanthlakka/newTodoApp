import User from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

export function generateRefreshandAccessToken(userId) {
    const user = User.findById({ _id: userId });
    if (!user) {
        throw new ApiError(401, "User not found");
    }
    const refershToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refershToken = refershToken;
    user.save({ validateBeforeSave: false });
    return { refershToken, accessToken };
}
