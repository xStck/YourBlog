import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    userBlogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    }]
})
export default mongoose.model("User", userSchema)
