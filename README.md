# YaadPaySimplifier (YPS)
Will help you to use YaadPay payment system in much more simple way.

All you need its just create object with required data (which depends on your needs) and pass it to yps.

```js
const yps = require('yaadpaysimplifier')

const payload = {
  payment: 'commitPostpone',
  terminalNumber: '123',
  transactionId: '12142152'
}

const execute = async () => {
  const result = await ysp(resObj)
}
execute()
```

## Installation
This is a Node.js module available through the npm registry.

Before installing, download and install latest version Node.js

When installation is finished using the npm install command:

```bash
$ npm i yaadpaysimplifier
```
## Description
Original YaadPay documentation: https://yaadpay.docs.apiary.io/#introduction

YPS comes with:

### 'cardCredentials'
-------------------------

This payment method will allow you to handle payment, when you need to pass Card Owner credentials from your API direct to YaadPay.
(credit card credentials will be given from your API)

### 'cardCredentialsPostpone'
-------------------------
Same to 'cardCredentials', but payment must be commited due some time.

###'commitPostpone'
-------------------------
Part of 'cardCredentialsPostpone' payment method. Will confirm pending payment.

### 'refPostpone'
-------------------------
This payment method will allow you to handle payment, when you need to pass Card Owner credentials from YaadPay payment page.
(credit card credentials will be given from outside of your API)

### 'getToken'
-------------------------
This payment method will allow you to handle payment, when you need to confirm payment later, using YaadPay token.
(without saving card number and cvv)
