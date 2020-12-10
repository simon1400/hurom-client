import React, {useState, useContext} from 'react'
import { modal, util } from 'uikit'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { DataStateContext } from '../../context/dataStateContext'

const ModalLogin = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState({
    email: false,
    password: false,
    exist: false,
    fields: false,
    notExist: false
  })

  const [errorMessages, setErrorMessages] = useState({
    email: 'zadejte platnou emailovu adresu',
    emptyPassword: 'zadejte vaše heslo',
    password: 'heslo není správné'
  })

  const closeModal = () => {
    modal(util.find('#login')).hide();
  }

  const handleInput = (e, type) => {
    if(type === 'email'){
      setError({ ...error, email: false, notExist: false})
      setEmail(e.target.value)
    }else if(type === 'password'){
      setError({ ...error, password: false, notExist: false})
      setPassword(e.target.value)
    }
  }

  const changeModal = (e, name) => {
    e.preventDefault()
    closeModal()
    modal(util.find(`#${name}`)).show();
  }


  const login = (e) => {
    e.preventDefault()
    if(!email.length || !password.length) {
      setError({...error, fields: true})
      return
    }

    axios.post('/.netlify/functions/login', {email, password}).then(res => {
      dataContextDispatch({ state: res.data.data, type: 'user' })
      window.location.href = '/user'
    }).catch(err => {
      setError({...error, notExist: true})
      setPassword('')
    })
  }

  return(
    <div id="login" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="uk-flex uk-flex-between uk-margin-medium-bottom">
          <span className="uk-label">Přihlásit se</span>
          <button className="uk-close-large" type="button" uk-close="" onClick={() => closeModal()}></button>
        </div>

        <div className="login_form">
          <form onSubmit={e => login(e)}>

            {/*{error.fields && <div className="uk-alert-danger" uk-alert="">
              <p>Vyplňte všechna pole</p>
            </div>}*/}

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                E-mail
                {(error.fields || error.notExist) && <span className="uk-text-danger">{errorMessages.email}</span>}
              </label>
              <div className="uk-form-controls">
                <input className={`uk-input ${(error.fields || error.notExist) && 'uk-form-danger'}`} id="form-stacked-text" value={email} onChange={e => handleInput(e, 'email')} type="email" tabIndex="1" pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Heslo
                {error.fields && <span className="uk-text-danger">{errorMessages.emptyPassword}</span>}
                {error.notExist && <span className="uk-text-danger">{errorMessages.password}</span>}
              </label>
              <div className="uk-form-controls">
                <input className={`uk-input ${(error.fields || error.notExist) && 'uk-form-danger'}`} id="form-stacked-text" value={password} onChange={e => handleInput(e, 'password')} type="password" tabIndex="2" />
              </div>
            </div>

            <button className="button primary uk-width-1-1 uk-margin-bottom" type="submit">Přihlásit se</button>
            <a href="/" className="button bare uk-width-1-1 uk-text-center" onClick={e => changeModal(e, 'forgot')}><span>zapomenuté heslo</span></a>

            <p className="uk-text-center uk-h3 uk-margin-small-bottom">Nemáte účet?</p>
            <button className="button bare uk-width-1-1" onClick={e => changeModal(e, 'signUp')}><span>REGISTROVAT</span></button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ModalLogin
