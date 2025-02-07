import app from "./src/app.js";
import dotenv from "dotenv";
import connectDb from "./src/db/index.js";

dotenv.config();

connectDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
