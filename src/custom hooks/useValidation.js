import React from 'react'

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = React.useState(false)
  const [minLengthError, setMinLengthError] = React.useState(false)
  const [maxLengthError, setMaxLengthError] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const [inputValid, setInputValid] = React.useState(false)

  React.useEffect(() => {
    for(const validation in validations) {
      switch (validation) {
        case 'minLength':
              value.length < validations[validation]
                            ? setMinLengthError(true)
                            : setMinLengthError(false)
              break;
        case 'isEmpty':
              value ? setEmpty(false) : setEmpty(true)
              break;
        case 'maxLength':
              value.length > validations[validation]
                            ? setMaxLengthError(true)
                            : setMaxLengthError(false)
              break;
        case 'isEmail':
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              pattern.test(String(value).toLowerCase())
                            ? setEmailError(false)
                            : setEmailError(true)
              break;
        default:
      }
    }
  }, [value, validations])

  React.useEffect(() => {
    if(isEmpty || minLengthError || maxLengthError || emailError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid
  }
}

export default useValidation
