const jwt = require("jsonwebtoken");

decodedToken = '';

module.exports = function verifyToken(req, res, next) {
    // decodedToken = '';
    // console.log(req.header);
    let bearerToken = req.header("Authorization");
    console.log(bearerToken);
    // console.log(JSON.stringify(req.headers));

    let token = bearerToken.split(' ');

    if(!bearerToken){
        return res.status(401).send("Access Denied");
    }

    jwt.verify(token[1], 'vishvap', (err, tokenData) => {
        if (err) {
            return res.status(400).json({ message: ' Unauthorized request' });
        }

        if(tokenData){
            // console.log(tokenData);
            // decodedToken = tokenData.username;
            console.log(tokenData);
            res.send(tokenData.doc);
            next();
        }
    })

    
}