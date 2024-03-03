import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'first name is required']
    },
    body: {
        type: String,
        required: [true, 'last name is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'email is required'],
        unique: true
    }
},
    { timeStamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;