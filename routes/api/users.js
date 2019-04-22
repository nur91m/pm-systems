const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const registerInputValidator = require('../../validation/register');
const loginInputValidator = require('../../validation/login');
const passport = require('passport');
const router = express.Router();

// Load User Model
const User = require('../../models/User');

//  @route  POST /api/users/register
//  @desc   Register user
//  @access Public

router.post('/register', (req, res) => {
  const { errors, isValid } = registerInputValidator(req.body);

  // Check input data values
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // If entered data is OK
  User.findOne({ email: req.body.email }).then(user => {    
    if (user) {
      return res.status(404).json({ email: 'Email already exists' });
    } else {
      const avatar = `${req.body.email.split('@')[0]}.jpg`;
      const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        discipline: req.body.discipline,
        avatar
      });
      newUser
        .save()
        .then(user => res.json(user))
        .catch(error => console.log(error));
    }
  });
});

//  @route  POST /api/users/login
//  @desc   Login user
//  @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = loginInputValidator(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({$or: [{email: req.body.email}, {email: req.body.email+'@kazgor.kz'}] }).then(user => { 
    // Check for user
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }
    // Check password
    if (user.password == req.body.password) {

        const payload = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,        
            avatar: user.avatar,
            role: user.role,
            discipline: user.discipline
          };
        // Sign token        
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (error, token) => {
            res.status(200).json({success: true, token: 'Bearer '+token});
        })
    } else {
      return res.status(400).json({ password: 'Password incorrect' });
    }
  });
});

//  @route  GET /api/users/current
//  @desc   Get current user
//  @access Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req,res)=>{
    res.status(200).json({
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        id: req.user.id,
        discipline: req.user.discipline,
        role: req.user.role
    })
} )



//  @route  POST /api/users/update
//  @desc   Update user data
//  @access Public

// router.post('/update', (req,res)=>{

// })

const fs = require('fs');
const readline =  require('readline');




router.get('/import', (req,res) => {
  let rl = readline.createInterface({
    input: fs.createReadStream('users2.txt')
});
  console.log('started')
// event is emitted after each line
rl.on('line', function(line) {
  let x = line.split('\t');
   
   const user = {
      name: x[0],
      lastName: x[1],
      email: x[2],
      password: x[4],
      position: x[5],
      role: x[6],
      discipline: x[7],
      avatar: x[8]
  }
  const newUser = new User(user);
  newUser.save();
});
res.json('Created');
})




module.exports = router;
