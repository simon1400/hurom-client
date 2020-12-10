import React from 'react'

const FirmInfo = ({state, setState, title = "", error = {}}) => {
  return(
    <>
      {!!title.length && <div>
        <h2>{title}</h2>
      </div>}
      <div className="uk-grid uk-width-1-1 uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <div>
          <label className="uk-form-label" htmlFor="name_firm">Obchodní jméno</label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.nameCompany ? 'uk-form-danger' : ''}`} id="name_firm" type="text" name="nameCompany" value={state.nameCompany} onChange={e => setState({...state, [e.target.name]: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="uk-form-label" htmlFor="ico_firm">IČO</label>
          <div className="uk-form-controls">
            <input className={`uk-input ${error.ico ? 'uk-form-danger' : ''}`} id="ico_firm" type="text" name="ico" value={state.ico} onChange={e => setState({...state, [e.target.name]: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="uk-form-label" htmlFor="dic_firm">DIČ</label>
          <div className="uk-form-controls">
            <input className="uk-input" id="dic_firm" type="text" name="dic" value={state.dic} onChange={e => setState({...state, [e.target.name]: e.target.value})} />
          </div>
        </div>
      </div>
    </>
  )
}

export default FirmInfo
