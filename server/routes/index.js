var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.send("This is the index page and API is running");
})

module.exports = router;