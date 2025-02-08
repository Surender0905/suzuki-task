import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

///create user
const createUser = asyncHandler(async (req, res) => {
    const { user, interest, age, mobile, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({
            success: false,
            message: "User already exists, email should be unique",
        });
    }

    const newUser = new User({
        user,
        interest,
        age,
        mobile,
        email,
    });
    await newUser.save();
    res.status(201).json({
        success: true,
        data: newUser,
    });
});

//get all users

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    if (users.length === 0) {
        res.status(404);
        throw new Error("No users found");
    }

    res.status(200).json({
        success: true,
        data: users,
    });
});

//get user by id
const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});

//update user
const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { user, interest, age, mobile, email } = req.body;
    const updatedUser = await User.findById(id);
    if (!updatedUser) {
        res.status(404);
        throw new Error("User not found");
    }
    updatedUser.user = user;
    updatedUser.interest = interest;
    updatedUser.age = age;
    updatedUser.mobile = mobile;
    updatedUser.email = email;
    await updatedUser.save();
    res.status(200).json({
        success: true,
        data: updatedUser,
    });
});

//delete user
const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(204).json({ message: "User deleted" });
});

export { createUser, getUsers, getUserById, updateUser, deleteUser };
