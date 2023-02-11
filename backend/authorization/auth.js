const jwt = require('jsonwebtoken')
const secret = 'ticproject';
const database = require('../database');
const { use } = require('../routing/routes');

module.exports = checkAuthorization = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        jwt.verify(req.token, secret, (err, decoded) => {
            if (err) {
                if (err.expiredAt) {
                    res.json({ "message": "Your token has expired!" });
                } else {
                    res.json({ "message": "Error during token decoding process!" });
                }
            } else {
                next();
            }
        })
    } else {
        res.json({ "message": "Missing token!" })
    }
}

module.exports = adminAuthorization = (req, res, next) => {

    const token = req.headers['authorization'].split(' ')[1];

    const userDecoded = jwt.verify(token, secret);
    const user = userDecoded.email;

    if (!user.includes('system')) {
        res.status(403).send('You are not granted access to internal operations!');
    }

    next();
};
