import React from 'react'
import './App.css'
import useInput from './custom hooks/useInput';

function App() {
  const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true})
  const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 8})

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
