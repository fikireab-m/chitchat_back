import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import path from "path";
import { fileURLToPath } from 'url';
import AdminBro from "admin-bro";
import AdminBroExpress from '@admin-bro/express';
import AdminBroMongoose from '@admin-bro/mongoose';

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import Comment from "./models/comment.js";
import Reply from "./models/reply.js";


dotenv.config();

const port = process.env.PORT || 5000;
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
    rootPath: '/admin',
    resources: [
        { resource: User, options: { navigation: { name: 'Resources' } } },
        { resource: Post, options: { navigation: { name: "Resources" } } },
        { resource: Comment, options: { navigation: { name: "Resources" } } },
        { resource: Reply, options: { navigation: { name: "Resources" } } },
    ],
    // dashboard: {
    //     component: AdminBro.bundle('./dashboard.jsx')
    // },
    branding: {
        companyName: "The Chitchat Cafe"
    }
}
const adminBro = new AdminBro(AdminBroOptions);

const router = AdminBroExpress.buildRouter(adminBro);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/socket.io.html"));
});

app.use(adminBro.options.rootPath, router)
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

// app.listen(port, () => console.log(`Server is running at port ${port}`));
server.listen(port, () => console.log(`Server is running at port ${port}`));