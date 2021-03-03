class Validation {
    constructor(assertion, rule, errMsg) {
      this.assertion = assertion
      this.rule = rule
      this.errMsg = errMsg
    }
    check(text) {
      return this.rule(text)
    }
    errMsg() {
      return this.errMsg
    }
  }
  
  export const validateExistence = new Validation(
    'input should have value',
    text => /\S/.test(text),
    'Required'
  )
  export const validateEmail =(text)=>{
    return  !(/[\w-]+@([\w-]+\.)+[\w-]+/i.test(text))? 'invalid email':null
  }
  export const validateLength = (text,min_len, max_len) => {
    const regex = new RegExp(`(?=.{${min_len},${max_len}})`, 'g')
     if(!regex.test(text))
      return `password has to be ${min_len}-${max_len} letter`
    
  }
  export const validateLowerCase = new Validation(
    'input should have an uppercase',
    text => !!text.match(/(?=.*[A-Z])/g),
    'at least one upper case'
  )
  export const validateUpperCase = new Validation(
    'input should have lowercase',
    text => !!text.match(/(?=.*[a-z])/g),
    'at least one lower case'
  )