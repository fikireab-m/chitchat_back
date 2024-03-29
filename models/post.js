import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    impressions: {
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        shares: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
    }
},
    { timeStamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;