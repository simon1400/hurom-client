import {useState, useEffect, useContext} from 'react'
import {offcanvas} from 'uikit'
import sanityClient from "../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import { DataStateContext } from '../../context/dataStateContext'

import query from '../../queries/product'

import Loader from '../../components/Loader'
import Product from '../../view/Product'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

export async function getServerSideProps({ params }) {

  const data = await sanityClient.fetch(query, {url: params.product})

  if(!data.length){
    return {
      notFound: true,
    }
  }
  var selectValue = {
    name: 'vybrat barvu',
    id: ''
  }

  var idsGTM = [data[0]._id]

  if(!data[0].variants?.length){
    selectValue.id = data[0]._id
  }else{
    idsGTM = data[0].variants.map(item => item._key)
  }
  const dataBread = [
    {
      link: `/odstavnovace`,
      title: 'Odšťavňovače'
    },
    {
      title: data[0].title
    }
  ]

  return {
    props: {
      dataBread,
      startSelectValue: selectValue,
      product: data[0],
      idsGTM
    }
  }
}

const ProductWrap = ({dataBread, startSelectValue, product, idsGTM}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [selectValue, setSelectValue] = useState(startSelectValue)
  const [error, setError] = useState(false)
  const [addToCardGTM, setAddToCardGTM] = useState(false)

  const buy = (e) => {
    e.preventDefault()
    if(!selectValue.id.length && !!product.variants?.length) {
      setError(true)
      return
    }
    let localBasket = dataContextState.basket
    let hasItem = -1

    for(var i = 0; i < localBasket.length; i++){
      if(localBasket[i].id === selectValue.id){
        hasItem = i
      }
    }

    if(hasItem >= 0) {
      localBasket[hasItem].count += 1
    }else{
      var newLocalBasket = {
        id: product._id,
        nameProduct: product.title,
        price: product.price,
        gift: product.gift,
        count: 1,
        image: product.image,
        imageUrl: urlFor(product.image).format('webp').url(),
        categorySlug: 'odstavnovac',
        slug: product.slug.current
      }
      if(!!product.variants?.length){
        newLocalBasket.variantProduct = selectValue.name
        newLocalBasket.id = selectValue.id
        newLocalBasket.image = product.variants.filter(item => item._key === selectValue.id)[0].image
        newLocalBasket.imageUrl = urlFor(product.variants.filter(item => item._key === selectValue.id)[0].image).format('webp').url()
      }
      localBasket.push(newLocalBasket)
    }

    // console.log(newLocalBasket);

    setAddToCardGTM(localBasket.id)

    dataContextDispatch({ state: localBasket, type: 'basket' })
    offcanvas('#canvas').show();
  }

  if(!product){
    return <Loader />
  }

  return <Product
            buy={buy}
            error={error}
            idsGTM={idsGTM}
            urlFor={urlFor}
            product={product}
            setError={setError}
            dataBread={dataBread}
            selectValue={selectValue}
            addToCardGTM={addToCardGTM}
            setSelectValue={setSelectValue}
          />

}

export default ProductWrap
