const keys = require('../keys');
var stripe = require('stripe')(keys.secretKey);

module.exports = {
    charge: (model) => {
        console.log(JSON.stringify(model, null, 2));

        return stripe.charges.create({
                amount: model.amount,
                currency: model.currency,
                customer: model.customer
            });
    }
};
