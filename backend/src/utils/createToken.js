import User from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

export async function createToken(userId, res) {
    const user = await User.findById(userId).select(
        "+accessToken +authenticatedAt +refreshToken"
    );
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.accessToken = accessToken;
    user.authenticatedAt = [...user.authenticatedAt, new Date().toISOString()];
    await user.save({ validateBeforeSave: false });

    if (!accessToken) {
        throw new ApiError(401, "Failed to generate access token");
    }
    const options = {
        httpOnly: true,
        // sameSite: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            refreshToken,
            accessToken,
            user,
        });
}
