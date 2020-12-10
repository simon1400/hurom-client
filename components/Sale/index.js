import React, {useEffect, useState} from 'react'
import sanityClient from "../../lib/sanity.js";

import query from '../../queries/sale'

const Sale = ({
  state,
  sale,
  setSale,
  saleCoupon,
  error,
  sum,
  setState,
  setError,
  setSaleCoupon
}) => {

  const [sales, setSales] = useState([])

  useEffect(() => {
    sanityClient.fetch(query).then(data => setSales(data))
  }, [])

  const changeSaleCoupon = value => {
    setError({...error, sale: false})
    setSale({value: '', type: ''})
    setSaleCoupon(value)
  }

  const toggleSale = () => {
    if(state.sale){
      setError({...error, sale: false})
      setSaleCoupon('')
    }
    setState({...state, sale: !state.sale})
  }

  const accessSale = (e) => {
    e.preventDefault()

    if(!sales.length){
      setError({...error, sale: true})
      return
    }

    const currentSales = sales.filter(item => item.title === saleCoupon)[0]

    if(!currentSales || sum < currentSales?.minValue){
      setError({...error, sale: true})
      return
    }

    setSale({value: currentSales.value, typ: currentSales.typ})
  }

  return(
    <>
      <label className="uk-margin-small"><input className="uk-checkbox" type="checkbox" name="sale" checked={state.sale} onChange={e => toggleSale()} /> Slevový kupón</label>
      {state.sale && <div>
        <div className="uk-grid uk-grid-small uk-margin-small-top" uk-grid="">
          <div className="uk-width-3-4">
            <div className="uk-form-controls">
              <input className={`uk-input ${error.sale && 'uk-form-danger'}`} disabled={sale.value > 0} id="saleCoupon" type="text" name="saleCoupon" value={saleCoupon} onChange={e => changeSaleCoupon(e.target.value)} />
            </div>
          </div>
          <div className="uk-width-1-4">
            <button onClick={e => accessSale(e)} className="button border-button" disabled={sale.value > 0}>použít</button>
          </div>
        </div>
        {sale.value > 0 && <div className="uk-alert-success uk-width-1-1 uk-margin-remove-bottom uk-text-center" uk-alert="">Slevový kupón aplikován.</div>}
        {error.sale && <div className="uk-alert-danger uk-width-1-1 uk-margin-remove-bottom uk-text-center" uk-alert="">Slevový kupón není platný.</div>}
      </div>}
    </>
  )
}

export default Sale
