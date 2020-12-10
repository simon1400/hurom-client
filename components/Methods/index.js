import React from 'react'

const Method = ({
  title,
  state,
  setState,
  errorMessages,
  error,
  name
}) => {

  const selectRadio = (index) => {
    const newState = [...state]
    newState.map(item => item.check = false)
    newState[index].check = true
    setState([...newState])
  }

  return (
    <div className="methods block uk-margin-medium-bottom">
      <table className="uk-table uk-table-middle uk-table-divider uk-margin-remove">
        <caption><h2 className="uk-h4">{title}</h2>{!!error[name] && <span className="uk-text-danger">{errorMessages[name]}</span>}</caption>
        <tbody>
          {state.map((item, index) => <tr key={index} className={`checkout-item ${item.disabled && 'disabled-check-item'}`}>
            <td className="uk-flex uk-flex-between">
              <div className="uk-form-controls radio-wrap">
                <label>
                  <input className="uk-radio" type="radio" name={item.name} disabled={item.disabled} value={item.value} onChange={() => selectRadio(index)} checked={item.check} />
                  <span>{item.label}</span>
               </label>
              </div>
              <div className="uk-text-right">
                {item.value > 0 && <span className="price-color">{item.value} Kč</span>}
                {item.value <= 0 && <span className="green-text">ZDARMA</span>}
              </div>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Method
