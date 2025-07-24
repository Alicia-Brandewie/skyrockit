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

router.get('/new', async (req,res) => {
    res.render('applications/new.ejs');
});

//POST for '/applications
router.post('/', async (req,res) => {
    try {
    const currentUser = await User.findById(req.session.user._id);     // Look up the user from req.session
    currentUser.applications.push(req.body);  // Push req.body (the new form data object) to the applications array of the current user
    await currentUser.save(); // Save changes to the user
    res.redirect(`/users/${currentUser._id}/applications`);
} catch (error) { //same as above
      console.log(error); // If any errors, log them and redirect back home
      res.redirect('/');  // Redirect back to the applications index view
    }
});

module.exports = router; 