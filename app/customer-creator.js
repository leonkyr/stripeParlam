const keys = require('../keys');
var stripe = require('stripe')(keys.secretKey);

module.exports = {
    create: (model) => {
        console.log(JSON.stringify(model, null, 2));

        return stripe.customers.create({
                source: model.token,
                description: model.email
            });
    }
};
