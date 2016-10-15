const keys = require('../keys');
var stripe = require('stripe')(keys.secretKey);

module.exports = {
    getAccounts: (model) => {
        console.log(JSON.stringify(model, null, 2));

        return new Promise((resolve, reject) => {
            stripe.accounts.listExternalAccounts(model.accountId, {object: "bank_account"})
                .then( banksAccounts => {
                    stripe.accounts.listExternalAccounts(model.accountId, {object: "card"})
                        .then( cards => {
                            const result = banksAccounts.data.concat(cards.data);
                            resolve(result);
                        })
                        .catch(error => {
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};
