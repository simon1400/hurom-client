import React from 'react'
import loadable from '@loadable/component'
import sanityClient from "../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

const Breadcrumb = loadable(() => import('../breadcrump'))

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const PageHead = ({big = false, data, dataBread, className}) => {
  return(
    <div className={`uk-inline uk-width-1-1 uk-margin-large-bottom ${className}`}>
      <div className={`uk-cover-container ${big ? "uk-height-large" : 'uk-height-medium'} container-height-top`}>
        <img
          className="uk-cover uk-img"
          data-src={urlFor(data.image).width(2500).auto('format').url()}
          data-srcset={`${urlFor(data.image).width(400).auto('format').url()} 400w,
                        ${urlFor(data.image).width(640).auto('format').url()} 640w,
                        ${urlFor(data.image).width(900).auto('format').url()} 900w,
                        ${urlFor(data.image).width(1000).auto('format').url()} 1000w,
                        ${urlFor(data.image).width(1900).auto('format').url()} 1900w,
                        ${urlFor(data.image).width(2400).auto('format').url()} 2400w`}
          alt={data.title}
          uk-cover=""
          uk-img="" />
      </div>
      <Breadcrumb head={true} data={dataBread} />
      <div className="uk-overlay-primary uk-position-cover"></div>
      <div className="uk-overlay uk-position-center uk-text-center uk-light">
        <h1 className="shadow_text">{data.title}</h1>
      </div>
    </div>
  )
}

export default PageHead
