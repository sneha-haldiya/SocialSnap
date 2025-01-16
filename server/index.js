import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

import http from "http";
const server = http.createServer(app);

import cors from "cors";
import { collection, followCollection } from "./mongo.js";

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("addUser", async (id) => {
        try {
            await collection.findOneAndUpdate({ _id: id }, { $set: { socketId: socket.id } }, { new: true });
        }
        catch (e) {
            console.error("error updating socket id", e);
        }
    })

    socket.on("followUser", async ({ defaultId, searchedId }) => {
        try {
            const defaultUser = await collection.findOne({ _id: defaultId });
            const SearchUser = await collection.findOne({ _id: searchedId });
            if (!defaultUser || !SearchUser) {
                socket.emit("followResponse", { message: "User not found" });
                return;
            }
            const isAlreadyFollowing = await followCollection.findOne({ userId: defaultUser._id, "following.userId": SearchUser._id });
            if (isAlreadyFollowing) {
                socket.emit("followResponse", { message: "Already Following" });
                return;
            }
            await followCollection.updateOne(
                { userId: defaultUser._id },
                { $addToSet: { following: { userId: SearchUser._id, name: SearchUser.username } } },
                { upsert: true, new: true }
            );
            await followCollection.updateOne(
                { userId: SearchUser._id },
                { $addToSet: { followers: { userId: defaultUser._id, name: defaultUser.username } } },
                { upsert: true, new: true }
            );
            await collection.findOneAndUpdate(
                { _id: searchedId },
                { $push: { notifications: { type: 'follow', message: `${defaultUser.username} started following you`, fromUserId: defaultUser._id, fromUsername: defaultUser.username } } }
            )
            socket.emit("followResponse", { message: "Success follow" });
            if (SearchUser.socketId) {
                io.to(SearchUser.socketId).emit("newFollowerNotification", { message: `${defaultUser.username} started following you`, date: new Date().toISOString() });
            }
        }
        catch (e) {
            socket.emit("followResponse", { message: `Error: ${e}` });
        }
    })

    socket.on("getNumbers", async (id) => {
        try {
            const followData = await followCollection.findOne({ userId: id });
            if (!followData) {
                const res = ({
                    message: "Success getNumbers",
                    postNum: 0,
                    followers: 0,
                    following: 0,
                });
                socket.emit("numbersResponse", res);
            }
            else {
                const res = ({
                    message: "Success getNumbers",
                    postNum: 0,
                    followers: followData.followers.length || 0,
                    following: followData.following.length || 0,
                });
                socket.emit("numbersResponse", res);
            }
        } catch (e) {
            socket.emit("numbersResponse", { message: `Error: ${e.message}` });
        }
    })

    socket.on("isFollowed", async ({ defaultId, searchedId }) => {
        try {
            const user = await followCollection.findOne({ userId: searchedId });
            let isFollowed = false;
            if (user && Array.isArray(user.followers)) {
                isFollowed = user.followers.some(follower => follower.userId.toString() === defaultId);
            }
            socket.emit("isfollowedResponse", { isFollowed, message: "Success response" });
        }
        catch (e) {
            socket.emit("isfollowedResponse", { isFollowed: false, message: `Error: ${e.message}` });
        }
    })

    socket.on("disconnect", async () => {
        try {
            await collection.findOneAndUpdate(
                { socketId: socket.id },
                { $unset: { socketId: "" } }
            );
        }
        catch (e) {
            console.error("error clearing socket id", e);
        }
    })
});

app.get("/", (req, res) => {
    console.log("server is up and runnning");
})

app.post("/", async (req, res) => {
    const { username, email, phoneno, password } = req.body;
    try {
        let exist;
        if (username) {
            exist = await collection.findOne({ username: username });
        }
        else if (email) {
            exist = await collection.findOne({ email: email });
        }
        else if (phoneno) {
            exist = await collection.findOne({ phoneno: phoneno });
        }
        if (exist) {
            if (exist.password == password) {
                res.json({ message: "Success login", username: exist.username, id: exist._id });
            }
            else {
                res.json("Failed: Incorrect Password");
            }
        }
        else {
            res.json("Failed: User Not Found");
        }
    }
    catch (e) {
        res.json(`Error: ${e}`);
    }
})

app.post("/signup", async (req, res) => {
    const { fullname, username, email, phoneno, password } = req.body;
    try {
        const exist = await collection.findOne({ username: username });
        if (exist) {
            res.json("Failed: User Found");
        }
        else {
            await collection.insertMany({ fullname: fullname, username: username, email: email, phoneno: phoneno, password: password });
            res.json("Success signup");
        }
    }
    catch (e) {
        res.json(`Error: ${e}`);
    }
})
app.post("/search", async (req, res) => {
    const { defaultId, username } = req.body;
    try {
        const users = await collection.find({ username: { $regex: `.*${username}.*`, $options: "i" } });
        if (users.length > 0) {
            const filteredUsers = users.filter(user => user._id.toString() !== defaultId);
            const usernames = filteredUsers.map(user => ({ username: user.username, id: user._id }));
            res.json({ message: "Searched", users: usernames });
        }
        else {
            res.json({ message: "No User Found", users: [] });
        }
    }
    catch (e) {
        res.json(`Error: ${e}`);
    }
})
app.post("/getUsername", async (req, res) => {
    const { searchedId } = req.body;
    try {
        const user = await collection.findOne({ _id: searchedId });
        res.json({ message: "Success getUsername", Username: user.username })
    } catch (e) {
        res.json({ message: `Error: ${e.message}` });
    }
});

app.post("/getFollowers", async (req, res) => {
    const { id } = req.body;
    try {
        const user = await followCollection.findOne({ userId: id });
        res.json({ message: "Success getFollowers", followers: user.followers })
    } catch (e) {
        res.json({ message: `Error: ${e.message}` });
    }
});

app.post('/getFollowing', async (req, res) => {
    try {
        const { id } = req.body;
        const user = await followCollection.findOne({ userId: id });
        res.json({ message: "Success getFollowing", following: user.following });
    } catch (error) {
        res.json({ message: "Error getFollowing", error });
    }
});

app.post("/getNotifications", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await collection.findOne({ _id: userId }, { notifications: 1 });
        res.json({ message: "Succcess Notifications", notifications: user.notifications });
    } catch (e) {
        res.json({ message: `Error: ${e.message}` });
    }
});
app.post("/clearNotifications", async (req, res) => {
    const { userId } = req.body;
    try {
        await collection.findOneAndUpdate({ _id: userId }, { $set: { notifications: [] } }, { new: true });
        res.json({ message: "Succcess clear Notifications" });
    } catch (e) {
        res.json({ message: `Error: ${e.message}` });
    }
});
app.listen(8000, () => {
    console.log("MongoDB Server connected on port 8000");
});

server.listen(3001, () => {
    console.log("server is running");
})