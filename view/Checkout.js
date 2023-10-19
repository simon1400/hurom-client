import React, {useEffect, useState} from 'react'
import loadable from '@loadable/component'
import AnimateHeight from 'react-animate-height';
import errorMessages from '../data/errorMessages'

const Page = loadable(() => import('../layout/page'))
const Sale = loadable(() => import('../components/Sale'))
const Methods = loadable(() => import('../components/Methods'))
const CanvasItem = loadable(() => import('../components/canvasItem'))
const InfoForm = loadable(() => import('../components/InfoForm'))
const FirmInfo = loadable(() => import('../components/FirmInfo'))

const Checkout = ({
  send,
  startSum,
  payMethod,
  deliveryMethod,
  basketItems,
  sum,
  sale,
  contactInfo,
  anotherAddress,
  firmInfo,
  state,
  description,
  error,
  setState,
  setDeliveryMethod,
  setPayMethod,
  setContactInfo,
  setError,
  setAnotherAddress,
  setFirmInfo,
  setDescription,
  setSale,
  setSaleCoupon,
  saleCoupon
}) => {

  useEffect(() => {
    setSaleCoupon('')
    setSale({value: 0, typ: ''})
  }, [payMethod, deliveryMethod])

  const [heightProductsList, setHeightProductsLits] = useState(0)

  const toggleProductsList = (e) => {
    e.preventDefault()
    setHeightProductsLits(heightProductsList === 0 ? 'auto' : 0)
  }

  return(
    <Page title="Objednávka">
      <div className="checkout uk-position-relative">
        <div className="uk-container">
          <div className="uk-grid" uk-grid="">
            <div className="uk-width-1-1 uk-width-2-3@s">
              <h1 className="uk-h3 uk-margin-large-top">Objednávka</h1>

              {error.exist && <div className="uk-alert-danger" uk-alert="">
                <p>Uzivatel s timto emailem uz existuje</p>
              </div>}

              {error.fields && <div className="uk-alert-danger" uk-alert="">
                <p>Vyplňte všechny povinne pole</p>
              </div>}

              <Methods title="Doprava" state={deliveryMethod} setState={setDeliveryMethod} error={error} errorMessages={errorMessages} name="deliveryMethod"  />
              <Methods title="Platba" state={payMethod} setState={setPayMethod} error={error} errorMessages={errorMessages} name="payMethod"  />

              <div className="block uk-margin-medium-top uk-padding-small">
                <InfoForm state={contactInfo} setState={setContactInfo} name="contact" error={error} setError={setError} errorMessages={errorMessages} title="Kontatkní údaje"  />
              </div>

              <div className="block uk-margin-medium-top uk-padding-small margin-last-bottom">
                <div className="uk-grid uk-child-width-1-1" uk-grid="">

                  <label className="uk-margin-small"><input className="uk-checkbox" type="checkbox" name="deliveryAnother" checked={state.deliveryAnother} onChange={e => setState({...state, deliveryAnother: !state.deliveryAnother})} /> Doručit na jinou adresu</label>
                  {state.deliveryAnother && <div className="uk-margin-small-bottom uk-margin-small-top"><InfoForm state={anotherAddress} setState={setAnotherAddress} name="another_adrress" title="" /></div>}

                  <label className="uk-margin-small"><input className="uk-checkbox" type="checkbox" name="firmInfo" checked={state.firmInfo} onChange={e => setState({...state, firmInfo: !state.firmInfo})} /> Doplnit firemní údaje</label>
                  {state.firmInfo && <div className="uk-margin-small-bottom uk-margin-small-top"><FirmInfo state={firmInfo} setState={setFirmInfo} error={error} /></div>}

                  {/*<label><input className="uk-checkbox" type="checkbox" name="createAccount" checked={state.createAccount} onChange={e => setState({...state, createAccount: !state.createAccount})} /> Založit účet pro příští objednávky</label>
                  {state.createAccount && <div className="uk-grid uk-grid-small uk-child-width-1-2" uk-grid="">
                    <div>
                      <label className="uk-form-label" htmlFor="password">Heslo</label>
                      <div className="uk-form-controls">
                        <input className={`uk-input ${error.nameCompany ? 'uk-form-danger' : ''}`} id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                      </div>
                    </div>
                  </div>}*/}

                  <label className="uk-margin-small"><input className="uk-checkbox" type="checkbox" name="description" checked={state.description} onChange={e => setState({...state, description: !state.description})} /> Poznámka k objednávce</label>
                  {state.description && <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s uk-margin-small-top" uk-grid="">
                    <div>
                      <div className="uk-form-controls">
                        <textarea className="uk-textarea" type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                      </div>
                    </div>
                    <div></div>
                  </div>}

                </div>
              </div>
            </div>


            <div className="uk-width-1-1 uk-width-1-3@s">
              <div className="basket-rightbar">
                <h2 className="uk-h3 uk-margin-large-top">Souhrn objednávky</h2>
                <div className="block">
                  <a href="/" className={`open-products-list ${!!heightProductsList && 'open'}`} aria-expanded={ heightProductsList !== 0 } aria-controls='example-panel' onClick={e => toggleProductsList(e)} >
                    {heightProductsList === 0 ? 'Zobrazit podrobnosti položek' : 'Skrýt podrobnosti položek'}
                    <img src="/assets/caret-down.svg" alt="down" uk-svg=""/>
                  </a>
                  {!!basketItems.length && <AnimateHeight id='example-panel' duration={500} height={heightProductsList}>
                    <div className="canvas-content-wrap">
                      {basketItems.map((item, index) => <CanvasItem key={index} data={item} index={index} basket={true} />)}
                    </div>
                    <a href="/kosik" className="small-text">Upravit obsah košíku</a>
                  </AnimateHeight>}
                  <hr />
                  <Sale
                    state={state}
                    setState={setState}
                    sale={sale}
                    setSale={setSale}
                    saleCoupon={saleCoupon}
                    error={error}
                    sum={startSum}
                    setError={setError}
                    setSaleCoupon={setSaleCoupon} />
                  <hr />
                  <table className="uk-table uk-table-divider uk-margin-remove-vertical">
                    <tbody>
                      {sale.value > 0 && <tr>
                        <td>Celková sleva</td>
                        <td className="uk-text-right">{sale.value} {sale.typ === 'procent' ? '%' : 'Kč'}</td>
                      </tr>}
                      <tr>
                        <td>Doprava</td>
                        <td className="uk-text-right">
                          {deliveryMethod.filter(item => item.check)[0]?.value > 0 && <span>{deliveryMethod.filter(item => item.check)[0].value.toLocaleString()} Kč</span>}
                          {deliveryMethod.filter(item => item.check)[0]?.value <= 0 && <span className="green-text">ZDARMA</span>}
                          {!deliveryMethod.filter(item => item.check)[0] && <span>–</span>}
                        </td>
                      </tr>
                      <tr>
                        <td>Platba</td>
                        <td className="uk-text-right">
                          {payMethod.filter(item => item.check)[0]?.value > 0 && <span>{payMethod.filter(item => item.check)[0].value.toLocaleString()} Kč</span>}
                          {payMethod.filter(item => item.check)[0]?.value <= 0 && <span className="green-text">ZDARMA</span>}
                          {!payMethod.filter(item => item.check)[0] && <span>–</span>}
                        </td>
                      </tr>
                      <tr>
                        <td>Celková cena</td>
                        <td className="uk-text-right price-color">{sum.toLocaleString()} Kč</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className="uk-margin-remove-top" />
                  <p>Všechny ceny jsou včetně DPH 21 %</p>
                  <p>Odesláním objednávky souhlasíte s <a href="/clanek/obchodni-podminky" target="_blank">obchodními podmínkami.</a></p>
                  {Object.values(error).indexOf(true) >= 0 && <div className="uk-alert-danger uk-width-1-1 uk-margin-remove-bottom uk-text-center" uk-alert="">Chyba, zkontrolujte si prosím vaše údaje.</div>}
                  <button onClick={() => send()} className="button primary uk-width-expand uk-margin-top">Odeslat objednávku</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Checkout
