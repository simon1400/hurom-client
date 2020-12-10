import {useState, useEffect, useContext} from 'react'
import loadable from '@loadable/component'
import { DataStateContext } from '../../context/dataStateContext'
import sanityClient from "../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

const Page = loadable(() => import('../../layout/page'))
const Button = loadable(() => import('../../components/Button'))

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const Basket = () => {

  const [basketItems, setBasketItems] = useState([])
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  useEffect(() => {
    setBasketItems(dataContextState.basket)
  }, [dataContextState.basket])

  const changeCount = (value, index) => {
    if(+value > 0){
      const newBasketItems = [...basketItems]
      newBasketItems[index].count = +value
      dataContextDispatch({ state: newBasketItems, type: 'basket' })
    }
  }

  const deleteItem = (index) => {
    let newBasketItems = [...basketItems]
    newBasketItems.splice(index, 1)
    dataContextDispatch({ state: newBasketItems, type: 'basket' })
  }


  const globalSum = () => {
    let sum = 0
    basketItems.map(item => {sum += +item.count * +item.price})
    return sum
  }

  return (
    <Page title="Košík">
      <div className="basket uk-position-relative">
        {!!basketItems.length ? <div className="uk-container">
          <div className="uk-grid" uk-grid="">
            <div className="uk-width-1-1 uk-width-2-3@s">
              <h1 className="uk-h3 uk-margin-large-top">Košík</h1>
              <div className="basket-content-wrap block">
                {!!basketItems.length && <table className="uk-table uk-table-middle uk-table-divider uk-margin-remove">
                  <thead>
                    <tr>
                      <th className="uk-table-expand">položky</th>
                      <th className="uk-width-small">množství</th>
                      <th className="uk-width-small uk-text-right">cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!basketItems.length && basketItems.map((item, index) => <tr key={index} className="basket-item">
                      <td className="uk-flex uk-flex-start">
                        <div className="basket-item-img">
                          <img src={urlFor(item.image).width(100).auto('format').url()} alt={item.title} />
                        </div>
                        <div className="basket-item-content">
                          <a href={`/${item.slug}/${item.categorySlug}`}>{item.nameProduct}</a>
                          {!!item.variantProduct && <span>{item.variantProduct}</span>}
                          {!!item.gift?.length && <span className="uk-text-success">+ dárek zdarma</span>}
                        </div>
                      </td>
                      <td>
                        <div className="control-product uk-flex uk-flex-start">
                          <div className="count-product-wrap uk-flex uk-margin-right">
                            <span onClick={() => changeCount((item.count > 0 ? item.count-1 : 0), index)}>-</span>
                            <input type="text" value={item.count} onChange={e => changeCount((e.target.value.length && Number(e.target.value) ? e.target.value : item.count), index)} />
                            <span onClick={() => changeCount(item.count+1, index)}>+</span>
                          </div>
                          <div></div>
                        </div>
                      </td>
                      <td className="basket-item-price">
                        <p className="price-color">{(item.price * item.count).toLocaleString()} Kč</p>
                        <span uk-icon="icon: close" onClick={() => deleteItem(index)}></span>
                      </td>
                    </tr>)}
                  </tbody>
                </table>}
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-1-3@s">
              <div className="basket-rightbar">
                <h2 className="uk-h3 uk-margin-large-top">Souhrn objednávky</h2>
                <div className="block uk-padding-small" >
                  <table className="uk-table uk-table-middle uk-table-divider">
                    <tbody>
                      <tr>
                        <td>Doprava</td>
                        <td className="uk-text-right green-text">ZDARMA</td>
                      </tr>
                      <tr>
                        <td>Platba</td>
                        <td className="uk-text-right green-text">ZDARMA</td>
                      </tr>
                      <tr>
                        <td>Celková cena</td>
                        <td className="uk-text-right price-color">{globalSum().toLocaleString()} Kč</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>Všechny ceny jsou včetně DPH 21 %</p>
                  <a href="/objednavka" className="button primary uk-width-expand uk-margin-top">Přejít k objednávce</a>
                </div>
              </div>
            </div>
          </div>
        </div> : <div className="uk-container uk-margin-xlarge-top">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div className="uk-text-center uk-margin">
              <h1>Váš košík je prázdný.</h1>
              <div className="uk-margin-large-top"><Button link="/odstavnovace" text="Zpět k nakupování" type="primary" /></div>
            </div>
          </div>
        </div>}
      </div>
    </Page>
  )
}

export default Basket
