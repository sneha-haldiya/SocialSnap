import mongoose from "mongoose";

async function connectDataBase(){
    try{
        await mongoose.connect("mongodb://localhost:27017/insta",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongoDB connected")
    }
    catch(e){
        alert(`Error mongoDB not connected: ${e}`)
    }
}
//{fullname,username,email,phoneno,password}
const userSchema = new mongoose.Schema({
    fullname : { type: String },
    username : { type: String, required: true},
    email : { type: String },
    phoneno : { type: String, match: /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/ },
    password : {type: String, required: true}
})

const collection = mongoose.model("collection",userSchema);

connectDataBase();
export default collection;

/* 
collections of user
collection of followers
collection of following
collection of chats {collection of messages}
{
    objectID of user1
    --user2
    messages: {}
}
*/

/* 
_objectID
numfollowers
numfollowing
listofusersfollowing: {id, messages: {name, time, message}}
listofusersfollowing: {id}
*/