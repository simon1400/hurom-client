import React, {useState, useContext} from 'react'
import { modal, util } from 'uikit'
import axios from 'axios'
import { DataStateContext } from '../../context/dataStateContext'

const ModalForgotPassword = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [email, setEmail] = useState('pechunka11@gmail.com')

  const [error, setError] = useState({
    noExist: false,
    fields: false
  })

  const [errorMessages, setErrorMessages] = useState({
    email: 'zadejte platnou emailovu adresu',
    empty: 'toto pole je povinné'
  })

  const closeModal = () => {
    modal(util.find('#forgot')).hide();
  }

  const handleInput = (e, type) => {
    if(type === 'email'){
      setError({ ...error, email: false, noExist: false})
      setEmail(e.target.value)
    }
  }

  const sendEmail = (e) => {
    e.preventDefault()
    axios.post('/.netlify/functions/sendResetPassword').then(res => {
      console.log('done');
      // dataContextDispatch({ state: res.data.data, type: 'user' })
      // window.location.href = '/user'
    }).catch(err => {
      console.log(err);
      // setError({...error, notExist: true})
      // setPassword('')
    })
  }

  return(
    <div id="forgot" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="uk-flex uk-flex-between uk-margin-medium-bottom">
          <span className="uk-label">zapomenuté heslo</span>
          <button className="uk-close-large" type="button" uk-close="" onClick={() => closeModal()}></button>
        </div>

        <div className="login_form">
          <form onSubmit={e => sendEmail(e)}>

            <p className="uk-text-center uk-margin-medium-bottom uk-margin-medium-top">Zadejte váš e-mail a my Vám na něj zašleme odkaz pro obnovu hesla.</p>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                E-mail
                {error.fields && <span className="uk-text-danger">{errorMessages.empty}</span>}
                {error.noeExist && <span className="uk-text-danger">{errorMessages.exist}</span>}
              </label>
              <div className="uk-form-controls">
                <input className={`uk-input ${(error.fields || error.noExist) && 'uk-form-danger'}`} id="form-stacked-text" value={email} onChange={e => handleInput(e, 'email')} type="email" tabIndex="1" pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$" />
              </div>
            </div>

            <button className="button primary uk-width-1-1 uk-margin-bottom" onClick={e => sendEmail(e)}>odeslat</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ModalForgotPassword
