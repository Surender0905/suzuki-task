import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//health check
app.get("/health", (req, res) => {
    res.send("ok");
});

//routes
app.use("/api/users", userRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found",
    });
});

// Global Error Handler.
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});

export default app;
