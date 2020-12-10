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
            <span>{data.count} ks</span>
            {!basket && <span uk-icon="icon: close" onClick={e => deleteItem(e, index)}></span>}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CanvasItem
