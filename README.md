# Update Terms and Conditions
https://stripe.com/docs/connect/updating-accounts

# Create file with credentials in the root keys.js with the following format
```
module.exports = {
    secretKey: 'sk_test_****',
    publicKey: 'pk_test_****'
};
```
Don't forget to substitute the keys.

# To start

```
npm install
npm start
ngrok http 3000
```

Take the url provided by ngrok and update Stripe account for web hooks

# IMPORTANT
Stripe accounts are payment destinations -- they can receive funds, but not provide them.
(Customers are payments sources, i.e. they provide funds.)
