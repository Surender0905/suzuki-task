import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return value.length > 0;
                },
                message: "Name cannot be empty",
            },
        },
        interest: {
            type: [String],
            required: true,
            validate: {
                validator: function (tags) {
                    return tags.length > 0;
                },
                message: "A post must have at least one tag.",
            },
        },
        age: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= 18;
                },
                message: "Age must be 18 or above",
            },
        },
        mobile: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return /^\d{10}$/.test(value);
                },
                message: "Invalid mobile number",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
                },
                message: "Invalid email format",
            },
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
