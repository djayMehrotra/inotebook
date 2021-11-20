var jwt = require('jsonwebtoken');
const JWT_SECRET = "Dannyisagoodb$oy";

const fetchuser = (req, res, next)=>{
    // get the user from the jwt token and add it to the req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token : token not found "});
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next(); // will call the callback function of login route    
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token "});
    }

    
}

module.exports = fetchuser;