import React from 'react'
import country from '../../data/country'

const InfoForm = ({state, setState, name, title, error = {}, setError = () => {}, errorMessages, onBlur = () => {}}) => {

  const changeState = (e) => {
    setError({...error, [e.target.name]: false})
    setState({...state, [e.target.name]: e.target.value})
  }

  return(
    <>
      {!!title.length && <div>
        <h2 className="uk-h4">{title}</h2>
      </div>}
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <div>
          <label className="uk-form-label" htmlFor={`email_${name}`}>
            e-mail
            {error.email && <span className="uk-text-danger">{errorMessages.email}</span>}
          </label>
          <div className="uk-form-controls">
            <input className={`uk-input ${(error.email || error.exist) && 'uk-form-danger'}`} id={`email_${name}`} type="text" name="email" onBlur={() => onBlur('email')} value={state.email} onChange={e => changeState(e)} />
          </div>
        </div>
        <div>
          <label className="uk-form-label" htmlFor={`phone_${name}`}>
            telefon
            {error.phone && <span className="uk-text-danger">{errorMessages.phone}</span>}
          </label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.phone && 'uk-form-danger'}`} id={`phone_${name}`} type="text" name="phone" value={state.phone} onChange={e => changeState(e)} />
          </div>
        </div>
      </div>
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <div>
          <label className="uk-form-label" htmlFor={`name_${name}`}>
            jméno
            {error.name && <span className="uk-text-danger">{errorMessages.name}</span>}
          </label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.name && 'uk-form-danger'}`} id={`name_${name}`} type="text" name="name" value={state.name} onChange={e => changeState(e)} />
          </div>
        </div>
        <div>
          <label className="uk-form-label" htmlFor={`surname_${name}`}>
            příjmení
            {error.surname && <span className="uk-text-danger">{errorMessages.surname}</span>}
          </label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.surname && 'uk-form-danger'}`} id={`surname_${name}`} type="text" name="surname" value={state.surname} onChange={e => changeState(e)} />
          </div>
        </div>
      </div>
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <div>
          <label className="uk-form-label" htmlFor={`address_${name}`}>
            ulice a č.p.
            {error.address && <span className="uk-text-danger">{errorMessages.address}</span>}
          </label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.address && 'uk-form-danger'}`} id={`address_${name}`} type="text" name="address" value={state.address} onChange={e => changeState(e)} />
          </div>
        </div>
        <div>
          <label className="uk-form-label" htmlFor={`city_${name}`}>
            město
            {error.city && <span className="uk-text-danger">{errorMessages.city}</span>}
          </label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.city && 'uk-form-danger'}`} id={`city_${name}`} type="text" name="city" value={state.city} onChange={e => changeState(e)} />
          </div>
        </div>
      </div>
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <div>
          <label className="uk-form-label" htmlFor={`zip_${name}`}>
            PSČ
            {error.zip && <span className="uk-text-danger">{errorMessages.zip}</span>}
          </label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.zip && 'uk-form-danger'}`} id={`zip_${name}`} type="text" name="zip" value={state.zip} onChange={e => changeState(e)} />
          </div>
        </div>
        <div>
         <label className="uk-form-label" htmlFor={`state_${name}`}>stát</label>
         <div className="uk-form-controls">
           <select className="uk-select" name="state" onChange={e => setState({...state, [e.target.name]: e.target.value})} value={state.state} id={`state_${name}`}>
             {country.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
           </select>
         </div>
        </div>
      </div>
    </>
  )
}

export default InfoForm
