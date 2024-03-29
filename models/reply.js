import mongoose from "mongoose";

const replySchema = mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
}, {
    timestamps: true
});

const Reply = mongoose.model("Reply", replySchema);
export default Reply;