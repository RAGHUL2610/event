// const express = require('express');
// const app = express.Router();
// const User = require('../models/User');

// app.get('/user', async function(req,res){
//     await User.find()
//     .then(
//         function(user){
//             res.send(user);
//         }
//     )
//     .catch( error =>{
//         res.send(error);
//     })
// })

// app.post('/login', function(req,res){
//     User.findOne({
//         SEmail:req.body.SEmail
//     })
//     .then(function(user){
//        if(user){
//             const Passkey = req.body.Password;
            
//             if(user.SPassword === Passkey){
//                 res.send({
//                     State:'Success'
//                 })
//             }
//             else{
//                 res.send('Password Dose Not Match')
//             }
//        }
//        else{
//             res.send('Username Dose Not Match')
//        }
//     })
//     .catch(error => res.send(error));
// })

// app.post('/adduser', async function(req,res){
//     await User.create({
//         Sname:req.body.Sname,
//         Squalification: req.body.Squalification,
//         SDepartment: req.body.SDepartment,
//         SEmail: req.body.SEmail,
//         SPassword: req.body.SPassword
//     })
//     .then(
//         function(user){
//             res.send(user);
//         }
//     )
//     .catch( error =>{
//         res.send(error);
//     })
// })

// app.get('/user/:id',async function(req,res){
//     await User.findById(req.params.id)
//     //params
//     .then(
//         function(user){
//             res.send(user);
//         }
//     )
//     .catch( error =>{
//         res.send(error);
//     })
// })

// app.put('/updateuser/:id', async function(req,res){
//     await User.findByIdAndUpdate(req.params.id,{
//         Sname:req.body.Name,
//         Squalification: req.body.Qualification,
//         SDepartment: req.body.Department,
//         SEmail: req.body.Email,
//         SPassword: req.body.Password
//     })
//     .then(
//         function(user){
//             res.send(user);
//         }
//     )
//     .catch( error =>{
//         res.send(error);
//     })
// })

// app.delete('/deleteuser/:id', async function(req,res){
//     await User.findByIdAndDelete(req.params.id)
//     .then(
//         function(){
//             res.send("profile Deleted");
//         }
//     )
//     .catch( error =>{
//         res.send(error);
//     })
// })
// module.exports = app;

const express = require('express');
const app = express.Router();
const User = require('../models/User');

// GET all users
app.get('/user', async function(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST login
app.post('/login', async function(req, res) {
    try {
        const user = await User.findOne({ SEmail: req.body.SEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.SPassword !== req.body.Password) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        res.json({ State: 'Success' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST adduser
app.post('/adduser', async function(req, res) {
    try {
        const newUser = await User.create(req.body);
        // Redirect to view staff details after successfully adding the staff
        // res.redirect(`/s`);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET user by ID
app.get('/user/:id', async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT updateuser by ID
app.put('/updateuser/:id', async function(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE deleteuser by ID
app.delete('/deleteuser/:id', async function(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
