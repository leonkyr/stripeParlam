const keys = require('../keys');
var stripe = require('stripe')(keys.secretKey);

// https://stripe.com/docs/connect/required-verification-information
// https://stripe.com/docs/connect/identity-verification
module.exports = {
    update: (model) => {
        console.log('Model>>');
        console.log(JSON.stringify(model));

        const legalEntity = _getLegalEntity(model);

        return stripe.accounts.update(model.accountId,
        {
            legal_entity: legalEntity,
            tos_acceptance: {
                date: 1476537443,
                ip: '77.228.144.129'
            }
        });
    },
};

const _getLegalEntity = (model) => {
    return {
        type: 'sole_prop',
        first_name: model.firstName,
        last_name: model.lastName,
        additional_owners: '',
        "address": {
            "city": "Barcelona",
            "country": "ES",
            "line1": "C/ Pallars 99",
            "line2": null,
            "postal_code": "08019",
            "state": "B"
        },
        dob: {
            day: 24,
            month: 10,
            year: 1980
        }
    };
}
