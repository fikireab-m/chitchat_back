import Comment from "../models/comment.js";
import Post from "../models/post.js";
import Reply from "../models/reply.js";
import User from "../models/user.js";

export const resources = [
    {
        resource: User, options: {
            id: 'Users',
            properties: {
                password: { isVisible: false },
                email: {
                    isVisible: {
                        edit: false,
                        list: true,
                        show: true,
                        filter: true,
                    }
                },
            }
        }
    },
    { resource: Post, options: { id: 'Posts' } },
    { resource: Comment, options: { id: 'Comments' } },
    { resource: Reply, options: { id: 'Replies' } }
] 