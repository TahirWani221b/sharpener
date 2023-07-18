const user = require('../models/user-data');

module.exports.signup = (req, res, next) => {
    const requestData = req.body;
    user.create({
        name: requestData.name,
        email: requestData.email,
        password: requestData.password
    })
        .then(() => {
            res.status(200).json({ status: true });
        })
        .catch(err => {
            res.status(404).json({ status: false });
        })
}