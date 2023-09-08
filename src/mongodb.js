const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://molisemahasele3:3n7mRFGmDT3XKj7B@cluster0.pj9syit.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("failed to connect")
})

const LogInSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:false
    },
    location:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    social_media_links:{
        type:String,
        required:false
    },
    profile_picture:{
        type:String,
        required:false
    }
})

const collection = new mongoose.model("Collection1",LogInSchema)

module.exports=collection