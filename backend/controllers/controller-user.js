const user = require('../models/user-data');
const bcrypt = require('bcrypt');
const saltrounds = 10;

module.exports.signup = (req, res, next) => {
    const requestData = req.body;
    bcrypt.hash(requestData.password, saltrounds, async (err, hash) => {
        console.log(err);
        try {
            let result = await user.create({
                name: requestData.name,
                email: requestData.email,
                password: hash
            });
            res.status(200).json({ status: true, messages: 'User Register Successfully!!' });
        } catch (error) {
            const { errors } = error;
            const errorMessages = errors.map(error => error.message);
            res.status(409).json({ status: false, message: errorMessages });
        }
    })
}

module.exports.login = (req, res, next) => {
    const requestData = req.body;
    user.findOne({
        where: {
            email: requestData.email,
        }
    })
        .then((user) => {
            if (user) {
                let { dataValues } = user;
                let password = dataValues.password;
                bcrypt.compare(requestData.password, password, async (err, result) => {
                    if (result) {
                        res.status(200).json({ status: true, messages: 'User logged In Successfully!' });
                    } else {
                        res.status(401).json({ status: false, messages: 'Password Not Matched!!' });
                    }
                });
            } else {
                res.status(404).json({ status: false, messages: 'User Not Found!!' });
            }
        })
        .catch(error => {
            console.log(error);
        });
}