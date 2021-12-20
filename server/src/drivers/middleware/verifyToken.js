const loginUserWithToken  = require('../../use_case/loginUserWithToken')
module.exports = (crypto) => {
    return (req, res, next) => {
        const bearerHeader = req.headers['authorization']
        if (!bearerHeader || typeof bearerHeader ===  'undefined') {
            res.sendStatus(403);
            return;
        }
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        loginUserWithToken({
            crypto,
            token: bearer[1],
        }).then((user) => {
            req.user = user
            next();
        });
    }
}