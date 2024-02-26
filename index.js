import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use('/api/users', userRoutes);
app.get("/", (req, res) => res.send('Welcome'));

app.listen(port, () => console.log(`Server is running at port ${port}`));