const express = require('express');
const router = express.Router();
const User = require('../models/Users');

const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
], async (req, res)=>{
    /* console.log('req    :',req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body); */

    // Finds the validation errors in this request and wraps them in an object with handy functions
    // check whether the user with this email already exists 
    try {
      //Logger
      //SQS
      // using if in case db error occurs
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user){
      return res.status(400).json({error: "Sorry user already exists with this email id"})
    } 
    // Create a new user
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      })
      
      /* .then(user => res.json(user))
      .catch(error=>{ console.log(error) 
        res.json({error: 'Please enter a unique value for email', message: error.message}) }) */
      res.json(user);
      } catch (error) {
        console.error(error.error);
        res.status(500).send("Some error occured");
      }

});

module.exports = router

/* 
http://localhost:3000/api/auth
*/