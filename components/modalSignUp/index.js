import React, {useState, useContext} from 'react'
import { modal, util } from 'uikit'
import axios from 'axios'
import { DataStateContext } from '../../context/dataStateContext'

const ModalSignUp = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState({
    email: false,
    password: false,
    passwordShort: false,
    exist: false,
    fields: false
  })

  const [errorMessages, setErrorMessages] = useState({
    email: 'zadejte platnou emailovu adresu',
    password: 'zadejte vaše heslo',
    passwordShort: 'zadejte alespoň 6 znaků',
    empty: 'toto pole je povinné',
    exist: 'tento e-mail je již používán'
  })

  const closeModal = () => {
    modal(util.find('#signUp')).hide();
  }

  const handleInput = (e, type) => {
    if(type === 'email'){
      setError({ ...error, email: false, exist: false})
      setEmail(e.target.value)
    }else if(type === 'password'){
      setError({ ...error, password: false, exist: false})
      setPassword(e.target.value)
    }
  }


  const onRegister = (e) => {
    e.preventDefault()
    if(!email.length || !password.length) {
      setError({...error, fields: true})
      return
    }else if(password.length < 6){
      setError({...error, passwordShort: true})
      return
    }
    axios.post('/.netlify/functions/userCreate', {email, password, contactInfo: email}).then(res => {
      if(res.data.error) {
        if(res.data.exist){
          setError({...error, exist: true})
        }else if(res.data.fields){
          setError({...error, fields: true})
        }else{
          setError({
            email: false,
            password: false,
            exist: false,
            fields: false
          })
        }
        return
      }
      dataContextDispatch({ state: res.data.data, type: 'user' })
      window.location.href = '/user'
    }).catch(err => console.log(err))
  }

  return(
    <div id="signUp" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="uk-flex uk-flex-between uk-margin-medium-bottom">
          <span className="uk-label">Registrace</span>
          <button className="uk-close-large" type="button" uk-close="" onClick={() => closeModal()}></button>
        </div>

        <div className="login_form">
          <form onSubmit={e => onRegister(e)}>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                E-mail
                {error.fields && <span className="uk-text-danger">{errorMessages.empty}</span>}
                {error.exist && <span className="uk-text-danger">{errorMessages.exist}</span>}
              </label>
              <div className="uk-form-controls">
                <input className={`uk-input ${(error.fields || error.exist) && 'uk-form-danger'}`} id="form-stacked-text" value={email} onChange={e => handleInput(e, 'email')} type="email" tabIndex="1" pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Heslo
                {error.fields && <span className="uk-text-danger">{errorMessages.empty}</span>}
                {error.passwordShort && <span className="uk-text-danger">{errorMessages.passwordShort}</span>}
              </label>
              <div className="uk-form-controls">
                <input className={`uk-input ${(error.fields || error.password || error.passwordShort) && 'uk-form-danger'}`} id="form-stacked-text" value={password} onChange={e => handleInput(e, 'password')} type="password" tabIndex="2" />
              </div>
            </div>
            <p>Odesláním registrace souhlasíte se <a href="/">zpracování osobních údajů.</a></p>
            <button className="button primary uk-width-1-1 uk-margin-bottom" onClick={e => onRegister(e)}>REGISTROVAT</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ModalSignUp
