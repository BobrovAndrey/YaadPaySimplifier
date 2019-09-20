
const querystring = require('querystring')
const superagent = require('superagent')

/**
 * @param {Object} [incPayload] payload for general logic. Visit GitHub page for more details
 */
const main = async (incPayload) => {
  try {
    const allowed = ['cardCredentials', 'cardCredentialsPostpone', 'commitPostpone', 'refPostpone', 'getToken']
    if (!incPayload.payment || allowed.indexOf(incPayload.payment) < 0) {
      throw Error(`Please choose one of the payment method, that allowed.`)
    } else if (incPayload.payment === 'cardCredentials') {
      if (!incPayload.terminalNumber) throw Error(`<YaadPay simplifier> Required field are missing: terminalNumber`)
      if (!incPayload.refPassword) incPayload.refPassword = '1234'
      if (!incPayload.amount) throw Error(`<YaadPay simplifier> Required field are missing: amount`)
      if (!incPayload.info) incPayload.info = 'YaadPay Simplifier test'
      if (!incPayload.cardNumber) throw Error(`<YaadPay simplifier> Required field are missing: creditCardNumber`)
      if (!incPayload.cardMonth) throw Error(`<YaadPay simplifier> Required field are missing: cardMonth`)
      if (!incPayload.cardYear) throw Error(`<YaadPay simplifier> Required field are missing: cardYear`)
      if (!incPayload.CVV) throw Error(`<YaadPay simplifier> Required field are missing: CVV`)
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
        throw Error(`Your card  expired`)
      } else {
        throw Error(`Payment system was returned with code: ${queryCredCardResult}. You can check out meaning of this code on %{https://yaadpay.docs.apiary.io/#}`)
      }
    } else if (incPayload.payment === 'cardCredentialsPostpone') {
      if (!incPayload.terminalNumber) throw Error(`<YaadPay simplifier> Required field are missing: terminalNumber`)
      if (!incPayload.refPassword) incPayload.refPassword = '1234'
      if (!incPayload.amount) throw Error(`<YaadPay simplifier> Required field are missing: amount`)
      if (!incPayload.info) incPayload.info = 'YaadPay Simplifier test'
      if (!incPayload.cardNumber) throw Error(`<YaadPay simplifier> Required field are missing: creditCardNumber`)
      if (!incPayload.cardMonth) throw Error(`<YaadPay simplifier> Required field are missing: cardMonth`)
      if (!incPayload.cardYear) throw Error(`<YaadPay simplifier> Required field are missing: cardYear`)
      if (!incPayload.CVV) throw Error(`<YaadPay simplifier> Required field are missing: CVV`)
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
        'PassP': incPayload.refPassword || '1234', // <=== Password for page auth
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
    } else if (incPayload.payment === 'commitPostpone') {
      if (!incPayload.terminalNumber) throw Error(`<YaadPay simplifier> Required field are missing: terminalNumber`)
      if (!incPayload.transactionId) throw Error(`<YaadPay simplifier> Required field are missing: transactionId`)

      const payloadPostponeConfirm = querystring.stringify({
        'action': 'commitTrans',
        'Masof': incPayload.terminalNumber,
        'TransId': incPayload.transactionId
      })

      const resultPostponeCommit = await superagent.post('https://icom.yaad.net/p/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Content-Length', payloadPostponeConfirm.length)
        .send(payloadPostponeConfirm)

      console.log(`<YaadPay simplifier> Postpone commit answer received`)
      return resultPostponeCommit
    } else if (incPayload.payment === 'refPostpone') {
      if (!incPayload.terminalNumber) throw Error(`<YaadPay simplifier> Required field are missing: terminalNumber`)

      const tokenPostponePayload = querystring.stringify({
        'action': 'pay',
        'Masof': incPayload.terminalNumber, // payment terminal
        'Info': incPayload.info || 'test YaadPay info', // payment information (description for our payment in future)
        'Amount': incPayload.amount || '1',
        'UTF8': 'True',
        'UTF8out': 'True',
        'PageLang': 'ENG',
        'Coin': incPayload.coin || 1, // <== 1 - ILS/ 2  - USD/ 3 - EURO/ 4 - Pound,
        'Postpone': 'True',
        'J5': 'False', // <== Credit line option
        'PassP': incPayload.refPassword || '1234', // <=== Password for page auth
        'UserId': incPayload.userId || '000000000',
        'ClientName': incPayload.name || 'testClientName',
        'ClientLName': incPayload.lname || 'testClientLname',
        'street': incPayload.street || 'test street',
        'city': incPayload.city || 'test City',
        'zip': incPayload.zip || '00000',
        'phone': incPayload.phone || '123123123123',
        'cell': incPayload.cellPhone || '+30000000000000',
        'email': incPayload.email || 'testmail@gmail.com',
        'Tash': incPayload.numberOfPayments || '1',
        'FixTash': incPayload.fixedNumberOfPayments || 'True',
        'Sign': incPayload.sign || 'False',
        'sendemail': incPayload.sendEmail || 'False',
        'tmp': incPayload.templateNumber || '1',
        'ShowEngTashText': incPayload.engPaymentText || 'True',
        'Order': incPayload.order || 'testOrderInfo',
        'MoreData': incPayload.moreData || 'True'
      })

      const refLink = {}
      const ref = `${'https://icom.yaad.net/p/'}?${tokenPostponePayload}`

      refLink.reference = ref
      return refLink
    } else if (incPayload.payment === 'getToken') {
      if (!incPayload.terminalNumber) throw Error(`<YaadPay simplifier> Required field are missing: terminalNumber`)
      if (!incPayload.transactionId) throw Error(`<YaadPay simplifier> Required field are missing: transactionId`)
      if (!incPayload.refPassword) throw Error(`<YaadPay simplifier> Required field are missing: refPassword`)

      const getTokenPayload = {
        action: 'getToken',
        Masof: incPayload.terminalNumber,
        TransId: incPayload.transactionId,
        PassP: incPayload.refPassword
      }

      const result = await superagent.post('https://icom.yaad.net/p/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(getTokenPayload)

      return result
    }
  } catch (err) {
    return console.log(`<YaadPay simplifier>: ${err.message}`)
  }
}

module.exports = main
