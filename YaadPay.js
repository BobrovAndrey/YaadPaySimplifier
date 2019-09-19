
const querystring = require('querystring')
const superagent = require('superagent')

const main = async (incPayload) => {
  switch (incPayload.payment) {
    case 'cardCredentials':
      if (!incPayload.terminalNumber) return console.log(`<YaadPay simplifier> Required field are missing: terminalNumber`)
      if (!incPayload.refPassword) incPayload.refPassword = '1234'
      if (!incPayload.amount) return console.log(`<YaadPay simplifier> Required field are missing: amount`)
      if (!incPayload.info) incPayload.info = 'YaadPay Simplifier test'
      if (!incPayload.cardNumber) return console.log(`<YaadPay simplifier> Required field are missing: creditCardNumber`)
      if (!incPayload.cardMonth) return console.log(`<YaadPay simplifier> Required field are missing: cardMonth`)
      if (!incPayload.cardYear) return console.log(`<YaadPay simplifier> Required field are missing: cardYear`)
      if (!incPayload.CVV) return console.log(`<YaadPay simplifier> Required field are missing: CVV`)
      if (!incPayload.name) incPayload.name = 'TestName'
      if (!incPayload.lastName) incPayload.lastName = 'TestLastName'
      if (!incPayload.userId) incPayload.userId = '000000000'

      const payloadCredCard = querystring.stringify({
        'action': 'soft',
        'Masof': incPayload.terminalNumber, // <== payment terminal
        'Info': incPayload.info, // payment information (description for our payment in future)
        'Amount': incPayload.amount,
        'UTF8': 'True',
        'UTF8out': 'True',
        'PageLang': 'ENG',
        'UserId': incPayload.userId || '000000000', // <=== client ID , in case the credit card company dosn't require ID, you can send 9 zero's
        'ClientName': incPayload.name || 'TestName',
        'ClientLName': incPayload.lastName || 'TestLName',
        'Coin': incPayload.Coin || 1, // <== 1 - ILS/ 2  - USD/ 3 - EURO/ 4 - Pound
        'street': incPayload.street || '',
        'city': incPayload.city || '',
        'zip': incPayload.zipCode || '',
        'phone': incPayload.phone || '',
        'email': incPayload.email || '',
        'Order': incPayload.order || 'testOrderInfo', // <== order information
        'Tash': incPayload.tash || '1', // <== number of payments
        'Sign': 'False',
        'MoreData': incPayload.MoreData || 'True',
        'J5': incPayload.j5 || 'False', // <== Credit line option
        'PassP': incPayload.refPassword, // <=== Password for page auth
        'CC': incPayload.cardNumber,
        'Tmonth': incPayload.cardMonth,
        'Tyear': incPayload.cardYear,
        'cvv': incPayload.CVV
      })

      const resultCredCard = await superagent.post('https://icom.yaad.net/p/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Length', payloadCredCard.length)
        .send(payloadCredCard)

      const queryCredCardResult = resultCredCard.text.split('&')[1].split('=')[1] // 36 card expired

      if (queryCredCardResult === '0') {
        console.log(`<YaadPay simplifier> Your payment from ${incPayload.cardNumber} was successfully send. Date: ${new Date()}`)
        return resultCredCard
      } else if (queryCredCardResult === '36') {
        console.log(`<YaadPay simplifier> Your card ${incPayload.cardNumber} expired`)
        return (new Error(`Your card  expired`))
      } else {
        console.log(`<YaadPay simplifier> Payment system was returned with code: ${queryCredCardResult}. You can check out meaning of this code on %{https://yaadpay.docs.apiary.io/#}`)
        return (new Error(`Payment system was returned with code: ${queryCredCardResult}. You can check out meaning of this code on %{https://yaadpay.docs.apiary.io/#}`))
      }

    case 'cardCredentialsPostpone':
      if (!incPayload.terminalNumber) return console.log(`<YaadPay simplifier> Required field are missing: terminalNumber`)
      if (!incPayload.refPassword) incPayload.refPassword = '1234'
      if (!incPayload.amount) return console.log(`<YaadPay simplifier> Required field are missing: amount`)
      if (!incPayload.info) incPayload.info = 'YaadPay Simplifier test'
      if (!incPayload.cardNumber) return console.log(`<YaadPay simplifier> Required field are missing: creditCardNumber`)
      if (!incPayload.cardMonth) return console.log(`<YaadPay simplifier> Required field are missing: cardMonth`)
      if (!incPayload.cardYear) return console.log(`<YaadPay simplifier> Required field are missing: cardYear`)
      if (!incPayload.CVV) return console.log(`<YaadPay simplifier> Required field are missing: CVV`)
      if (!incPayload.name) incPayload.name = 'TestName'
      if (!incPayload.lastName) incPayload.lastName = 'TestLastName'
      if (!incPayload.userId) incPayload.userId = '000000000'

      const payloadCardCredPostpone = querystring.stringify({
        'action': 'soft',
        'Masof': incPayload.terminalNumber, // <== payment terminal
        'Info': incPayload.info, // payment information (description for our payment in future)
        'Amount': incPayload.amount,
        'UTF8': 'True',
        'UTF8out': 'True',
        'PageLang': 'ENG',
        'Postpone': 'True',
        'UserId': incPayload.userId || '000000000', // <=== client ID , in case the credit card company dosn't require ID, you can send 9 zero's
        'ClientName': incPayload.name || 'TestName',
        'ClientLName': incPayload.lastName || 'TestLName',
        'Coin': incPayload.Coin || 1, // <== 1 - ILS/ 2  - USD/ 3 - EURO/ 4 - Pound
        'street': incPayload.street || '',
        'city': incPayload.city || '',
        'zip': incPayload.zipCode || '',
        'phone': incPayload.phone || '',
        'email': incPayload.email || '',
        'Order': incPayload.order || 'testOrderInfo', // <== order information
        'Tash': incPayload.tash || '1', // <== number of payments
        'Sign': 'False',
        'MoreData': incPayload.MoreData || 'True',
        'J5': incPayload.j5 || 'False', // <== Credit line option
        'PassP': incPayload.refPassword, // <=== Password for page auth
        'CC': incPayload.cardNumber,
        'Tmonth': incPayload.cardMonth,
        'Tyear': incPayload.cardYear,
        'cvv': incPayload.CVV
      })

      const resultCardCredPostpone = await superagent.post('https://icom.yaad.net/p/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Length', payloadCardCredPostpone.length)
        .send(payloadCardCredPostpone)

      console.log(`<YaadPay simplifier> Your payment from ${incPayload.cardNumber} was successfully send. Date: ${new Date()}`)
      return resultCardCredPostpone

    case 'commitPostpone':
      console.log('we are here')
      if (!incPayload.terminalNumber) return console.log(`<YaadPay simplifier> Required field are missing: terminalNumber`)
      if (!incPayload.transactionId) return console.log(`<YaadPay simplifier> Required field are missing: transactionId`)

      const payloadPostponeConfirm = querystring.stringify({
        'action': 'commitTrans',
        'Masof': incPayload.terminalNumber, // <== payment terminal
        'TransId': incPayload.transactionId
      })

      console.log('sending terminal ==>', payloadPostponeConfirm)
      const resultPostponeCommit = await superagent.post('https://icom.yaad.net/p/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Length', payloadPostponeConfirm.length)
        .send(payloadPostponeConfirm)

      console.log(`<YaadPay simplifier> Postpone commit answer received}`)
      return resultPostponeCommit

    default: console.log('Please choose one of the payment method, that allowed: `cardCredentials`, `cardCredentialsPostpone`, `commitPostpone`')
  }
}

module.exports = main
