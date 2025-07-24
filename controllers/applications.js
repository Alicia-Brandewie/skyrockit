const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        });
    } catch (error) {
        console.log(error); // keep, never show for the user, for data gathering 
        //note it is also ABOVE the response, if below wouldn't show
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
});

//POST for '/applications
router.post('/', async (req, res) => {
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


//GET to /applications/:applicationID
router.get('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/show.ejs', {
            application: application,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//EDIT
router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

//UPDATE
router.put('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId); 
        application.set(req.body); // Use the Mongoose .set() method
            // this method updates the current application to reflect the new form
            // data on `req.body`
        await currentUser.save();
        res.redirect(
            `/users/${currentUser._id}/applications/${req.params.applicationId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


//DELETE
router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req.params.applicationId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router; 