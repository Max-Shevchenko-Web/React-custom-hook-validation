import React from 'react'
import './App.css'


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

const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue)
  const [isDirty, setDirty] = React.useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

function App() {
  const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true})
  const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 8})
  console.log(password)
  return (
    <div className='app'>
      <form >
        <h1>Регистрация</h1>
        <div className='input-block' >
          {(email.isDirty && email.isEmpty) && <div className='input-error'>Поле не может быть пустым!</div> }
          <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name="email" type="text" placeholder='Enter your email...'/>
        </div>
        <div className='input-block' >
          {(password.isDirty && password.isEmpty) && <div className='input-error'>Поле не может быть пустым!</div> }
          <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} name="password" type="password" placeholder="Enter yout password..." />
        </div>
        <button disabled={!email.inputValid || !password.inputValid} type="submit">Войти</button>
      </form>
    </div>
  )
}

export default App
