import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'first name is required']
    },
    lname: {
        type: String,
        required: [true, 'last name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
},
    { timeStamps: true }
)
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
})
const User = mongoose.model('User', userSchema);
export default User;