const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
const bcrypt = require("bcrypt")

const templatePath = path.join(__dirname,'../templates')

//middleware
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

//routes
app.get("/",(req,res)=>{
    res.render("welcome")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})


app.post("/signup", async (req, res) => {
    const data = {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        location: req.body.location,
        email: req.body.email,
        role: req.body.role,
        contact: req.body.contact
    }

    await collection.insertMany([data]);

    res.render("home");
});

app.post("/login", async (req, res) => {
   
    try{
        const check = await collection.findOne({username:req.body.username})

        if(await bcrypt.compare(req.body.password, check.password)){
            res.render("home")
        }
        else
        {
            res.send("wrong password or username")
        }

    }
    catch{
        res.send("wrong username or password")
    }
});


app.listen(3000,()=>{
    console.log("port connected");
})