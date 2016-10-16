const keys = require('../keys');
var stripe = require('stripe')(keys.secretKey);

module.exports = {
    create: (model) => {
        console.log('Payment account creator');
        console.log(JSON.stringify(model, null, 2));

        return stripe.accounts.createExternalAccount(
            model.accountId,
            {
                external_account: model.token,
                // currency: model.currency,
                default_for_currency: true
            }
        );
    }
};
