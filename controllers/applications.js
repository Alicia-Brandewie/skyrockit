const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) =>{
    try {
        res.render('applications/index.ejs');
    } catch (error) {
        console.log(error); // keep, never show for the user, for data gathering 
        //note it is also ABOVE the response, if below wouldn't show
        res.redirect('/');
    }
})

router.get('/new', async (req,res) =>{
    res.render('applications/new.ejs');
})


module.exports = router; 