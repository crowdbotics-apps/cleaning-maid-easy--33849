const validator = {
  name: {
    regEx: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
    error: 'Only alphabetic letters are allowed with spaces in between.'
  },
  email: {
    regEx:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Invalid email address.'
  },
  phone: {
    regEx: /^\d+$/,
    error: 'Enter a valid phone number without a + sign.'
  },
  password: {
    regEx: /(?=^.{8,16}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    error:
      'Password must be minimum length 8 and maximum length 16 characters (with at least a lowercase letter and uppercase letter, a number and special character.'
  },
  numeric: {
    regEx: /^\d+$/,
    error: 'Only numeric digits allowed.'
  },
  dateFormat: {
    regEx:
      /^(?:(0[1-9]|[12][0-9]|3[01])[\/.](0[1-9]|1[012])[\/.](19|20)[0-9]{2})$/,
    error: 'Date must be in DD/MM/YYYY format'
  },
  passportNumber: {
    regEx: /(?=^.{0,9}$).*$/,
    error: "Passport numbers's length can't be more then 9"
  },
  address:{
    regEx: /([a-zA-Z]+\s?)+\s([a-zA-Z]+\s?)+,\s[a-zA-Z]{2}/,
    error: "Address must be in format like Address City, State"
    
  }
}

export default validator
