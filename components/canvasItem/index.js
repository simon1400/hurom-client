import {useContext} from 'react'
import Link from 'next/link'
import sanityClient from "../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import { DataStateContext } from '../../context/dataStateContext'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const CanvasItem = ({data, index, basket = false}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const deleteItem = (e, index) => {
    e.preventDefault()
    let newCanvasItems = [...dataContextState.basket]
    newCanvasItems.splice(index, 1)
    dataContextDispatch({ state: newCanvasItems, type: 'basket' })
  }

  const changeCount = (e, value, index) => {
    e.preventDefault()
    if(+value > 0){
      const newBasketItems = [...dataContextState.basket]
      newBasketItems[index].count = +value
      dataContextDispatch({ state: newBasketItems, type: 'basket' })
    }
  }

  return (
    <Link href={`/${data.categorySlug}/${data.slug}`}>
      <a className="canvas-item uk-flex uk-flex-between">
        <div className="canvas-item-img">
          <img
            className="uk-img"
            data-src={urlFor(data.image).width(100).auto('format').url()}
            uk-img=""
            alt={data.title} />
        </div>
        <div className="canvas-item-info">
          <h4 className="uk-margin-small-bottom">{data.nameProduct}{data.variantProduct ? ' - ' + data.variantProduct : ''}</h4>
          <p>{(+data.price).toLocaleString()} Kč {!!data.gift?.length && <span className="uk-text-success">+ dárek zdarma</span>}</p>
         
          <div className="canvas-item-count uk-flex uk-flex-between">
            {/* <span>{data.count} ks</span> */}
            <div className="count-product-wrap uk-flex uk-margin-right">
              <span onClick={(e) => changeCount(e, (data.count > 0 ? data.count-1 : 0), index)}>-</span>
              <input type="text" value={data.count} onChange={e => changeCount(e, (e.target.value.length && Number(e.target.value) ? e.target.value : data.count), index)} />
              <span onClick={(e) => changeCount(e, data.count+1, index)}>+</span>
            </div>
            {!basket && <span uk-icon="icon: close" onClick={e => deleteItem(e, index)}></span>}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CanvasItem
