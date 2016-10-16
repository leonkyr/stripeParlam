const keys = require('../keys');
var stripe = require('stripe')(keys.secretKey);

module.exports = {
    transfer: (model) => {
        console.log(JSON.stringify(model, null, 2));

        return stripe.transfers.create({
                amount: model.amount,
                currency: model.currency,
                destination: model.destination,
                description: model.description
            });
    }
};
