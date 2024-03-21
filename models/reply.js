import mongoose from "mongoose";

const replySchema = mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Reply = mongoose.model("Reply", replySchema);
export default Reply;