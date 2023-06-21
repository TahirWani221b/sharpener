const rootdir = require('../util/path');
const fs = require('fs');
const path = require('path');
let dataFile = path.join(rootdir, 'data', 'products.json');

const getdataFromFile = callback => {
    fs.readFile(dataFile, 'utf8', (err, contentFile) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(contentFile));
        }
    });
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getdataFromFile(products => {
            products.push(this);
            fs.writeFile(dataFile, JSON.stringify(products), 'utf8', (error) => {
                if (error) {
                    console.error('Error adding product: ', error);
                    return;
                }
                console.log('Product has been written.');
            });
        });
    }
    static fetchAll(callback) {
        getdataFromFile(callback);
    }
}