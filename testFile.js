const yaadSimplifier = require('./YaadPay')

const { terminalNumber } = require('./config/keys')

const execute = async () => {
  // card payment with credentials

  // const resObj = {
  //   payment: 'cardWithCredentials',
  //   terminalNumber,
  //   amount: '10',
  //   cardNumber: '4580000000000000',
  //   cardMonth: '12',
  //   cardYear: '2021',
  //   name: 'James',
  //   lastName: 'Bond',
  //   street: 'levanon 3',
  //   CVV: '123'
  // }

  // postpone card payment with credentials
  // const resObj = {
  //   payment: 'cardCredentialsPostpone',
  //   terminalNumber,
  //   amount: '10',
  //   cardNumber: '4580000000000000',
  //   cardMonth: '12',
  //   cardYear: '2021',
  //   name: 'James',
  //   lastName: 'Bond',
  //   street: 'levanon 3',
  //   CVV: '123'
  // }

  // commit postpone
  const resObj = {
    payment: 'commitPostpone',
    terminalNumber,
    transactionId: '12142152'
  }

  // console.log('givenTerminal ==>', resObj)

  // result = Id=12141409&CCode=800&Amount=10&ACode=0012345&Fild1=&Fild2=&Fild3=&Bank=6&tashType=&Payments=1&TashFirstPayment=&UserId=L1979576889&Brand=2&Issuer=2&L4digit=0000&firstname=James&lastname=Bond&info=YaadPay%20Simplifier%20test&street=levanon%203&city=&zip=&cell=&email=&Coin=1&Tmonth=12&Tyear=2021&CardName=%28%3F%3F%3F%3F%29%20Cal&errMsg=%D7%97%D7%99%D7%95%D7%91%20%D7%93%D7%97%D7%95%D7%99 (800)
  // Id=12142152&CCode=800&Amount=10&ACode=0012345&Fild1=&Fild2=&Fild3=&Bank=6&tashType=&Payments=1&TashFirstPayment=&UserId=L1979576889&Brand=2&Issuer=2&L4digit=0000&firstname=James&lastname=Bond&info=YaadPay%20Simplifier%20test&street=levanon%203&city=&zip=&cell=&email=&Coin=1&Tmonth=12&Tyear=2021&CardName=%28%3F%3F%3F%3F%29%20Cal&errMsg=%D7%97%D7%99%D7%95%D7%91%20%D7%93%D7%97%D7%95%D7%99 (800)
  const result = await yaadSimplifier(resObj)

  console.log('==>', result.body)
  console.log('result is ===============>', result.text)
}

execute()
