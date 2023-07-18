const user = require('../models/user-data');

module.exports.signup = (req, res, next) => {
    const requestData = req.body;
    user.create({
        name: requestData.name,
        email: requestData.email,
        password: requestData.password
    })
        .then(() => {
            res.status(200).json({ status: true, messages: 'User Register Successfully!!' });
        })
        .catch(error => {
            const { errors } = error;
            const errorMessages = errors.map(error => error.message);
            res.status(409).json({ status: false, message: errorMessages });
        });
}