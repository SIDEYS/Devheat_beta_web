const express = require("express");
const router = express.Router();
const Post = require("../Models/Post")


//Routes
router.get('/', (req, res) => { res.send('We are on posts page');
 }); 

 

// router.get('/specific', (req, res) => { res.send('Specific post ');
//  }); 
 
router.post('/', (req, res) => { 
    console.log(req.body); 
    return req.body();
});

 module.exports = router;