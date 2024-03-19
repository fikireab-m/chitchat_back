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
    impressions:{
        likes:{
            type:Number,
            bsonType:'int'
        },
        replies:{
            type:Number,
            bsonType:'int'
        }
    }
},
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;