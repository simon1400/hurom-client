import {useState, useEffect} from 'react'
import {dropdown} from 'uikit'
// import Head from 'next/head'
import BlockContent from "@sanity/block-content-to-react";

import Page from '../layout/page'
import ArticleShort from '../components/Article'
import Breadcrumb from '../components/breadcrump'
// import Button from '../components/Button'
import Card from '../components/Card'

const GalerySlider = ({item, urlFor, title}) => {
  return(
    <li>
      <img className="uk-img"
        src={urlFor(item).auto('format').url()}
        srcSet={`${urlFor(item).width(400).auto('format').url()} 400w,
                  ${urlFor(item).width(640).auto('format').url()} 640w,
                  ${urlFor(item).width(900).auto('format').url()} 900w,
                  ${urlFor(item).width(1000).auto('format').url()} 1000w`}
        uk-img=""
        alt={title} />
    </li>
  )
}

const Product = ({
  product,
  dataBread,
  setError,
  setSelectValue,
  urlFor,
  addToCardGTM,
  idsGTM,
  error,
  selectValue,
  buy
}) => {

  const [variantImages, setVariantImages] = useState([])

  useEffect(() => {
    if(product.variants?.length){
      var varImg = []
      product.variants.map(item => {
        varImg.push({image: item.image, title: item.title})
        if(item.galery?.length){
          item.galery.map(galerItem => {
            varImg.push({image: galerItem, title: item.title})
          })
        }
      })
      setVariantImages(varImg)
    }
  }, [])

  useEffect(() => {
    if(product.variants?.length){
      var varImg = []
      product.variants.map(item => {
        if(selectValue.id.length && item._key !== selectValue.id){
          return
        }
        varImg.push({image: item.image, title: item.title})
        if(item.galery){
          item.galery.map(galerItem => {
            varImg.push({image: galerItem, title: item.title})
          })
        }
      })
      setVariantImages(varImg)
    }
  }, [selectValue])

  const selectVariant = (e, value, index) => {
    e.preventDefault()
    setError(false)
    setSelectValue({name: value.title, id: value._key})
    dropdown('#color-select').hide(false);
  }

  return(
    <Page title={product?.meta?.head} description={product?.meta?.description} image={urlFor(product.image).url()} >
      <Breadcrumb data={dataBread} />
      <div className="uk-container uk-margin-large-top">
        <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="">
          <div>
            <div className="uk-position-relative uk-visible-toggle uk-height-1-1" style={{maxHeight: '100vh', minHeight: '500px'}} tabIndex="-1" uk-slideshow="index: 0">

              <ul className="uk-slideshow-items uk-height-1-1" style={{maxHeight: '100vh'}}>
                {!product.variants?.length && <GalerySlider item={product.image} title={product.title} urlFor={urlFor} />}
                {variantImages.map((item, index) => <GalerySlider key={index} item={item.image} title={item.title} urlFor={urlFor} />)}
                {!!product?.slider?.length && product.slider.map((item, index) => <GalerySlider key={index} item={item} urlFor={urlFor} />)}
              </ul>

              <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="" uk-slideshow-item="previous"></a>
              <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="" uk-slideshow-item="next"></a>

            </div>
          </div>
          <div>
            <div className="product-base-info">
              <div className="action-label-wrap">
                {!!product?.label?.length && <label className="action-label">{product.label}</label>}
                {!!product?.label2?.length && <label className="action-label green">{product.label2}</label>}
              </div>
              <label className="uk-label">HUROM</label>
              <h1 className="uk-h3 uk-margin-medium-bottom">{product.title}</h1>
              {product.price > 0 && <p className="price">
                {!!product?.priceBeforeSale && <span className="before-sale">{(product.priceBeforeSale).toLocaleString()} Kč</span>}
                {product.price.toLocaleString()} Kč
              </p>}
              <div className="product-buy-wrap uk-margin-medium-top uk-margin-large-bottom">
                {!!product.variants?.length && <div className="uk-inline uk-width-1-1">
                  {error && <span className="uk-text-danger">Vyberte barvu</span>}
                  <button className={`select ${error && 'uk-form-danger'}`} type="button">{selectValue.name} <img src="/assets/chevron-down.svg" alt="down" uk-svg="" /></button>
                  <div id="color-select" uk-dropdown="mode: click; pos: bottom-justify; offset: 0">
                    <ul>
                      {product.variants.map((item, index) => <li key={index}><a href="/" onClick={e => selectVariant(e, item, index)}>{item.title}</a></li>)}
                    </ul>
                  </div>
                </div>}

                {product.price > 0 && <a href="/" className="button primary" onClick={e => buy(e)}>koupit</a>}
              </div>
              {!!product.benefits?.length && <ul>
                {product.benefits.map((item, index) => <li key={index}><img src={
                  item.icon === 'apple' ? '/assets/benefits/apple-alt-regular.svg' :
                  item.icon === 'check' ? '/assets/benefits/check-circle-regular.svg' :
                  item.icon === 'briliant' ? '/assets/benefits/gem-regular.svg' :
                  item.icon === 'darek' ? '/assets/benefits/gift-regular.svg' :
                  item.icon === 'heart' ? '/assets/benefits/heart-regular.svg' :
                  item.icon === 'check-alt' ? '/assets/benefits/shield-check-regular.svg' :
                  item.icon === 'star' ? '/assets/benefits/star-regular.svg' :
                  item.icon === 'like' ? '/assets/benefits/thumbs-up-regular.svg' : '/assets/benefits/truck-regular.svg'
                } uk-svg="" /> {item.title}</li>)}
              </ul>}
              {!!product?.gift?.length && <div className="gift uk-margin-medium-top">
                <label className="uk-label">+ Dárek zdarma</label>
                <p className="uk-margin-remove">{product.gift[0].title}</p>
                <div className="gift-img"><img src={urlFor(product.gift[0].image).auto('format').url()} alt={product.gift[0].title}/></div>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <div className="product-content-wrap">
        <ul className="uk-flex-center uk-tab uk-margin-remove-bottom uk-margin-large-top" uk-tab="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium">
          {!!product.descriptions?.length && <li><a href="#">popis</a></li>}
          {!!product.param?.length && <li><a href="#">parametry</a></li>}
          {!!product.galery?.length && <li><a href="#">galerie</a></li>}
          {!!product.accessories?.length && <li><a href="#">příslušenství</a></li>}
          {!!product.recenze?.length && <li><a href="#">Recenze</a></li>}
        </ul>

        <ul className="uk-switcher">
          {(!!product.descriptions?.length || !!product.content) && <li className="product-content switcher-content">
            {!!product.content && <div className="uk-container uk-container-xsmall">
              <div className="uk-margin-large-top uk-margin-large-bottom uk-text-center big-text"><BlockContent blocks={product.content} /></div>
            </div>}
            {!!product.descriptions.length && <div className="uk-container">
              {product.descriptions.map((item, index) => <ArticleShort key={index} data={item} inside={true} reverse={!(index % 2)}/>)}
            </div>}
          </li>}


          {!!product.param?.length && <li className="product-content switcher-content">
            <div className="uk-container uk-container-xsmall uk-margin-large-top uk-margin-large-bottom">
              <table className="uk-table uk-table-small uk-table-divider">
                <tbody>
                  {!!product.parametry?.length && product.parametry.map((item, index) => <tr key={index}>
                    <td>{product.param.filter(param => param._id === item.parameter._ref)[0].head}</td>
                    <td className="uk-text-right">{item.value} {product.param.filter(param => param._id === item.parameter._ref)[0].value}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </li>}

          {!!product.galery?.length && <li className="product-content switcher-content">
            <div className="uk-container uk-container-small uk-margin-large-top uk-margin-large-bottom">
              <div className="uk-grid uk-child-width-1-2" uk-grid="masonry: true" uk-lightbox="animation: fade">
                {product.galery.map((item, index) => <div key={index}>
                  <a className="uk-inline uk-width-1-1" href={urlFor(item).auto('format').url()}>
                    <img src={urlFor(item).width(540).auto('format').url()} alt="adfdsf" className="uk-width-1-1" />
                  </a>
                </div>)}
              </div>
            </div>
          </li>}


          {!!product.accessories?.length && <li className="product-content switcher-content">
            <div className="uk-container uk-container-small uk-margin-large-top uk-margin-large-bottom">
              <div className="uk-grid uk-child-width-1-3">
                {product.accessories.map((item, index) => <div key={index}><Card data={item} /></div>)}
              </div>
            </div>
          </li>}

          {!!product.recenze?.length && <li className="product-content switcher-content">
            <div className="uk-container uk-container-small uk-margin-large-top uk-margin-large-bottom">

              {product.recenze.map((item, index) => <div key={index} className="recenze-item">
                <div className="star-wrap">
                  <ul className={`star-${item.value}`}>
                    <li><img className="uk-svg" src="/assets/star.svg" uk-svg="" /></li>
                    <li><img className="uk-svg" src="/assets/star.svg" uk-svg="" /></li>
                    <li><img className="uk-svg" src="/assets/star.svg" uk-svg="" /></li>
                    <li><img className="uk-svg" src="/assets/star.svg" uk-svg="" /></li>
                    <li><img className="uk-svg" src="/assets/star.svg" uk-svg="" /></li>
                  </ul>
                </div>
                <div className="recenze-name">
                  <span className="uk-label">{item.name}</span>
                </div>
                <div className="recenze-content">
                  <BlockContent blocks={item.content} />
                </div>
              </div>)}
            </div>
          </li>}

        </ul>

      </div>
    </Page>
  )
}

export default Product
