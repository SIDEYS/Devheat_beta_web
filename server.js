const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());


//Routes 
// Importing routes from posts.js
const postsRoute = require("./routes/posts");
app.use('/posts', postsRoute);


app.get('/', (req, res) => { res.sendFile(__dirname + '/menu.html'); });
 

app.post("/send", (req, res) => { console.log(req.body); 
 res.redirect('/');
});

//Connect to DB
// mongodb+srv:HSK:Hsk@6305@productdata.bepvc.mongodb.net/ProductData
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true},() => {
    console.log("Connected to MongoDB");
});

//Listening to the server
app.listen(3000);