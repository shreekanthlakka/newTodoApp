import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, lowercase: true, required: true },
        password: { type: String, required: true, select: false },
        refreshToken: { type: String },
        accessToken: { type: String, select: false },
        forgotPasswordToken: { type: String },
        forgotPasswordExpiry: { type: Date },
        role: {
            type: String,
            default: "user",
        },
        authenticatedAt: { type: [Date], select: false },

        /*todoId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],*/
        // username: { type: String, unique: true, required: true },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isValidatePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET, {
        expiresIn: "10m",
    });
};

userSchema.methods.getForgotPasswordToken = async function () {
    const token = crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    return token;
};

const User = mongoose.model("User", userSchema);
export default User;
