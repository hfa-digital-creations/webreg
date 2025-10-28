    import express from "express";
    import userController from "../controllers/userController.js";

    const router = express.Router();

    router.post("/register", userController.registerUser);
    router.get("/users", userController.getAllUsers);
    router.get("/download", userController.downloadUsers); // ⬅️ new

    export default router;
