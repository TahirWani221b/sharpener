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
                if (password != requestData.password) {
                    res.status(409).json({ status: false, messages: 'Password Not Matched!!' });
                } else {
                    res.status(200).json({ status: true, messages: 'User logged In Successfully!' });
                }
            } else {
                res.status(409).json({ status: false, messages: 'User Not Found!!' });
            }
        })
        .catch(error => {
            console.log(error);
        });
}