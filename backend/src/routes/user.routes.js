import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = Router();

router.post("/", validateUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);
export default router;
