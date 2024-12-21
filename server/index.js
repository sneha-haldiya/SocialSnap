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
                res.json("Success login");
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
app.listen(8000, () => {
    console.log("MongoDB Server connected on port 8000");
});

server.listen(3001,() => {
    console.log("server is running");
})