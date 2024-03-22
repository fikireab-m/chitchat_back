import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    impressions: {
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        replies: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        }
    }
},
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;