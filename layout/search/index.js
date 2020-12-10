import React, {useState, useEffect, useContext, useRef} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import sanityClient from "../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import { offcanvas, util } from 'uikit'

import query from '../../queries/search'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const Search = () => {

  const [searchItems, setSearchItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchNotFound, setSearchNotFound] = useState('')
  const [loadding, setLoaading] = useState(false)
  const input = useRef(null);

  const { dataContextState } = useContext(DataStateContext)

  const closeCanvas = () => {
    offcanvas(util.find('#search')).hide();
  }

  useEffect(() => {
    if(dataContextState.state.searchFocus){
      input.current.focus()
    }
  }, [dataContextState])

  useEffect(() => {
    setSearchItems(dataContextState.search)
  }, [dataContextState.search])

  const handleSearch = async (value) => {
    setSearchValue(value)
    await setLoaading(true)
    if(value.length > 2){
      const data = await sanityClient.fetch(query, {value: value + '*'})
      if(!data?.length){
        setSearchNotFound('Nic jsme nenašli, zkuste jiné slovo.')
      }else{
        setSearchNotFound('')
      }
      await setSearchItems(data)
    }else{
      await setSearchItems([])
    }
    await setLoaading(false)
  }

  return (
    <div id="search" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar uk-background-muted">
        <div className="uk-flex uk-flex-between">
          <div className="canvas-head uk-flex uk-flex-left">
            <div className="uk-inline uk-width-1-1">
              <a className="uk-form-icon" href="/" uk-icon="icon: search"></a>
              <input className="uk-input uk-width-1-1" type="text" value={searchValue} onChange={e => handleSearch(e.target.value)} ref={input} />
            </div>
          </div>
          <button className="uk-offcanvas-close uk-close-large uk-margin-left" type="button" uk-close=""></button>
        </div>
        <hr />
        <div className="results">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            {!!searchItems?.length && searchItems.map((item, index) =>
              <div key={index}>
                <a href={item._type === 'product' ? `/${item.slug}/odstavnovac` : `/${item.slug}/clanek`} onClick={() => closeCanvas()} className="card">
                  {item._type === 'product' &&<div className="card-img-wrap">
                    <div className="square">
                      <img src={urlFor(item.image).width(270).auto('format').url()} alt={item.title} />
                    </div>
                  </div>}
                  {item._type === 'article' && <div className="uk-card-media-top uk-cover-container" style={{height: '150px'}}>
                    <img src={urlFor(item.image).width(270).auto('format').url()} alt={item.title} uk-cover="" />
                  </div>}
                  <div className="card-content-wrap">
                    <h4>{item.title}</h4>
                    {item._type === 'product' && <span>{item.price} Kč</span>}
                    {item._type === 'article' && <p>{item.content[0].children[0].text}</p>}
                  </div>
                </a>
              </div>
            )}
            {!!searchNotFound.length && <p className="uk-text-center">{searchNotFound}</p>}
            {loadding && <div uk-spinner=""></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
