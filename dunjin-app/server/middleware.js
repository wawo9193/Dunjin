const jwt = require('jsonwebtoken');
const secret = 'milleniumfalcon';

const withAuth = function(req, res, next) {
    const token = req.cookies.token;  

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                req.password = decoded.password;

                if (decoded.itemid!=undefined) {
                    console.log("inhere");
                    req.itemid = decoded.itemid;
                    req.token = decoded.token;
                }
                next();
            }
        });
    }
}

module.exports = withAuth;