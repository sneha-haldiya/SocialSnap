import express from "express";
//const mongoose = require('mongoose');

const app = express();

import http from "http";
const server = http.createServer(app);

import cors from "cors";
import collection from "./mongo.js";
app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    console.log("server is up and runnning");
})

app.post("/",async(req,res) => {
    const {username,email,phoneno,password} = req.body;
    try{
        let exist;
        if(username){
        exist = await collection.findOne({username: username});}
        else if(email){
        exist = await collection.findOne({email: email});}
        else if(phoneno){
        exist = await collection.findOne({phoneno: phoneno});
        }
        if(exist){
            if(exist.password == password){
                res.json({message: "Success login",username: exist.username});
            }
            else{
                res.json("Failed: Incorrect Password");
            }
        }
        //go to signup
        else{
            res.json("Failed: User Not Found");
        }
    }
    catch(e){
        res.json(`Error: ${e}`);
    }
})
 
app.post("/signup",async(req,res) => {
    const {fullname,username,email,phoneno,password} = req.body;
    try{
        const exist = await collection.findOne({username: username});
        if(exist){
            res.json("Failed: User Found");
        }
        else{
            await collection.insertMany({fullname:fullname,username:username,email:email,phoneno:phoneno,password:password});
            res.json("Success signup");
        }
    }
    catch(e){
        res.json(`Error: ${e}`);
    }
})
app.post("/search",async(req,res) => {
    const {defaultUsername, username} = req.body;
    try{
        const users = await collection.find({username: { $regex: `.*${username}.*`, $options: "i" }});
        // console.log(defaultUsername,"default");
        if(users.length > 0) {
            const usernames = users.filter(({ username }) => defaultUsername !== username).map(user => user.username);
            // const usernames = users.map((user) =>{if(defaultUsername === user.username) return; return user.username});
            console.log(usernames);
            // const usernames = users.map( user => user.username);
            res.json({message: "Searched",users: usernames});
        }
        else{
            res.json({message: "No User Found",users: []});
        }
    }
    catch(e){
        res.json(`Error: ${e}`);
    }
})
app.listen(8000, () => {
    console.log("MongoDB Server connected on port 8000");
});

server.listen(3001,() => {
    console.log("server is running");
})