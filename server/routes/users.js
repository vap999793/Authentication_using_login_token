var express = require("express");
// var mongoose = require("mongoose");
var User = require('../models/user');
var bcryptjs = require('bcryptjs');
var jwt = require("jsonwebtoken");
var verifyToken = require("../verifyToken");

var router = express.Router();

router.post('/register', async (req, res, next) => {

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        creation_dt: Date.now()
    })

    let promise = user.save();

    promise.then((doc) => {
        // res.send(doc);
        return res.status(201).json(doc);
    })

    promise.catch((err) => {
        return res.status(501).json({ message: 'Error registering user.' })
    })

})

router.post('/login', async (req, res, next) => {
    let promise = User.findOne({ email: req.body.email }).exec();

    promise.then((doc) => {
        if (doc) {
            console.log(doc.username);
            console.log(typeof (doc));

            bcryptjs.compare(req.body.password, doc.password, function (err, data) {
                if (!err && data) {
                    let token = jwt.sign({ doc }, 'vishvap', { expiresIn: '3h' });
                    // res.setHeader('Content-Type', 'application/json');
                    // res.header("auth-token", token).send(token);
                    console.log(req.header);
                    res.status(200).json({"token" : token,
                                        "message" : "Authentication Successfull"});
                }
                else if (!data) {
                    res.send("INVALID CREDENTIALS");
                }
                else {
                    res.send(err);
                }
            });


            // else {
            //     res.send("Invalid credentials");
            // }
        }
        else {
            res.send("User does not exist");
        }
    })

    promise.catch(function (err) {
        return res.status(501).json({ message: 'Some internal error' });
    })
})





router.get('/username', verifyToken, (req, res, next) => {
    return res.send();
})

// function verifyToken(req, res, next) {
//     console.log(req.header);
//     let token = req.header("auth-token");
//     console.log(token);
//     // console.log(JSON.stringify(req.headers));

//     if(!token){
//         return res.status(401).send("Access Denied");
//     }

//     // jwt.verify(token, 'vishvap', (err, tokenData) => {
//     //     if (err) {
//     //         return res.status(400).json({ message: ' Unauthorized request' });
//     //     }

//     //     if(tokenData){
//     //         decodedToken = tokenData.username;
//     //         next();
//     //     }
//     // })

//     try{

//         const verified = jwt.verify(token, 'vishvap');
//         decodedToken = verified.useranme;
//         next();

//     }

//     catch{
//         res.status(400).send("Invalid Token");
//     }
// }

module.exports = router;

