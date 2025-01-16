import mongoose from "mongoose";
import { Socket } from "socket.io";

async function connectDataBase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/insta");
        console.log("mongoDB connected")
    }
    catch (e) {
        alert(`Error mongoDB not connected: ${e}`)
    }
}

const userSchema = new mongoose.Schema({
    fullname: { type: String },
    username: { type: String, required: true },
    email: { type: String },
    phoneno: { type: String, match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/ },
    password: { type: String, required: true },
    socketId: { type: String, default: null },
    notifications: [{ message: { type: String }, date: { type: Date, default: Date.now } }]
})

const followSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    followers: [{
        userId: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true }
    }],
    following: [{
        userId: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true }
    }]
})

const collection = mongoose.model("collection", userSchema);
const followCollection = mongoose.model("Follow", followSchema);

connectDataBase();
export { collection, followCollection };