import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { createServer } from 'node:http';
import { Server } from 'socket.io';

import path from "path";
import { fileURLToPath } from 'url';

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import { Components, componentLoader } from "./admin/components/index.js";
import {resources} from "./admin/resources.js";


dotenv.config();

const port = process.env.PORT || 5000;
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})


const admin = new AdminJS({
    rootPath: "/admin",
    dashboard: {
        component: Components.Dashboard,
    },
    resources: resources,
    componentLoader
})

const adminRouter = AdminJSExpress.buildRouter(admin)

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "../public")));

app.get("/", async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/socket.io.html"));
});

app.use(admin.options.rootPath, adminRouter);
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
admin.watch();