const express = require('express');
const router = express.Router();
const accountCreator = require('../app/account-creator');
const customerCreator = require('../app/customer-creator');
const customerCharger = require('../app/customer-charger');
const accountUpdater = require('../app/account-updater');
const paymentAccountRetriever = require('../app/payment-account-retriever');
const paymentAccountCreator = require('../app/payment-account-creator');
const customerToAccountTransfer = require('../app/customer-to-account-transfer');
const keys = require('../keys');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/client-create', function(req, res, next) {
  res.render('client-create', { title: 'Create Client Account' });
});

router.post('/client-create', function(req, res, next) {
    console.log(JSON.stringify(accountCreator, null, 2));

    accountCreator.create({
        country: req.body.country,
        email: req.body.email
    })
    .then(result => {
        console.log(`result: ${JSON.stringify(result, null, 2)}`);
        res.render('client-created', result);
    })
    .catch(error => {
        console.log(`Error: ${error}`);
        res.render('error', { message: error, error: error });
    })
});

router.get('/client-update', function(req, res, next) {
    res.render('client-update', { title: 'Update Client Account' });
});

router.post('/client-update-account', function(req, res, next) {
    const model = {
        accountId: req.body.accountId,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    accountUpdater.update(model)
        .then(result => {
            console.log(`result: ${JSON.stringify(result, null, 2)}`);
            res.render('client-updated', result);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            res.render('error', { message: error, error: error });
        })
});

router.get('/client-list-accounts-form', function(req, res, next) {
    res.render('client-list-accounts-form', {
        title: 'List Client Accounts',
        publicKey: keys.publicKey
    });
});

router.post('/client-save-account-token', function(req, res, next){
    const model = {
        accountId: req.body.accountId,
        token: req.body.token,
        currency: req.body.currency
    };
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(model));

    paymentAccountCreator.create(model)
        .then(result => {
            res.render('add-card', {
                title: 'Add card',
                publicKey: keys.publicKey,
                token: model.token
            });
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            res.render('error', { message: error, error: error });
        })
});

router.post('/client-list-accounts', function(req, res, next) {
    const model = {
        accountId: req.body.accountId
    };

    paymentAccountRetriever.getAccounts(model)
        .then(result => {
            console.log(`result: ${JSON.stringify(result, null, 2)}`);
            res.render('client-list-accounts', result);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            res.render('error', { message: error, error: error });
        })
});

router.get('/add-card', function(req, res, next) {
  res.render('add-card', {
      title: 'Add card',
      publicKey: keys.publicKey
  });
});

router.get('/add-bank-account-provider', function(req, res, next) {
    res.render('add-bank-account-provider', {
        title: 'Add bank account (Provider)',
        publicKey: keys.publicKey
    });
});

router.get('/client-pay', function(req, res, next) {
  res.render('client-pay', {
      title: 'Client Pay',
      publicKey: keys.publicKey,
      currency: 'eur',
      amount: 10000,
      description: 'Translate War and Peace'
  });
});

router.post('/client-pay-process', (req, res, next) => {
    const model = {
        token: req.body.token,
        email: 'xavi@parlam.com',
        amount: 10000,
        currency: 'eur'
    };

    customerCreator.create(model)
        .then(result => {
            model.customer = result.id;
            return customerCharger.charge(model);
        })
        .then(result => {
            res.render('client-pay', {
                title: 'Client Pay',
                publicKey: keys.publicKey,
                currency: 'eur',
                amount: model.amount,
                description: 'Translate War and Peace',
                thankyou: true
            });
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            res.render('error', { message: error, error: error });
        });
});

router.get('/transfer', function(req, res, next) {
  res.render('customer-to-account-transfer', { title: 'Transfer' });
});

router.post('/transfer-to-account', function(req, res, next) {
    const model = {
        destination: req.body.accountId,
        amount: req.body.amount,
        currency: req.body.currency,
        description: req.body.description
    };

    customerToAccountTransfer.transfer(model)
        .then(result => {
            console.log(`result: ${JSON.stringify(result, null, 2)}`);
            res.render('client-list-accounts', result);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            res.render('error', { message: error, error: error });
        })
});

router.get('/client-manage', function(req, res, next) {
  res.render('client-manage', { title: 'Manage Client Account' });
});

router.get('/provider-create', function(req, res, next) {
  res.render('provider-create', { title: 'Create Provider Account' });
});

router.get('/provider-manage', function(req, res, next) {
  res.render('provider-manage', { title: 'Manage Provider Account' });
});

module.exports = router;
