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
        required: true
    },
    impressions: {
        likes: {
            type: Number,
            bsonType: 'int',
            default: 0
        },
        comments: {
            type: Number,
            bsonType: 'int',
            default: 0
        },
        shares: {
            type: Number,
            bsonType: 'int',
            default: 0
        },
    }
},
    { timeStamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;