const bookingApp = require('../models/user-data');

module.exports.submitData = (req, res, next) => {
    const requestData = req.body;
    let submitType = requestData.submitType;

    if (submitType === "create-user") {
        bookingApp.create({
            name: requestData.name,
            email: requestData.email,
            phone: requestData.phone
        })
            .then(() => {
                res.send('true');
            })
            .catch(err => {
                console.log(err);
                res.send('Error while saving data! Error : ' + err);
            })
    } else if (submitType === "update-user") {
        bookingApp.update({
            name: requestData.name,
            email: requestData.email,
            phone: requestData.phone
        }, {
            where: {
                id: req.body.id
            }
        })
            .then(() => {
                res.send('true');
            })
            .catch(err => {
                console.log(err);
                res.send('Error while saving data! Error : ' + err);
            })
    }
}

module.exports.getData = (req, res, next) => {
    bookingApp.findAll()
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.log(err);
        })
}
module.exports.deleteData = (req, res, next) => {
    bookingApp.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(() => {
            res.send('Appointment Deleted!')
        })
        .catch(err => {
            console.log(err);
        })
}


