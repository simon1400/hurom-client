import React, {useState, useEffect} from 'react'
import sanityClient from "../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head'
import query from '../queries/homepage'

import Page from '../layout/page'
import Card from '../components/Card'
import ArticleShort from '../components/Article'
import Loader from '../components/Loader'
import Button from '../components/Button'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

export async function getServerSideProps() {
  const allPostsData = await sanityClient.fetch(query)
  const productsRef = allPostsData[0].productsRef
  allPostsData[0].productsRef = [
    productsRef.filter(item => allPostsData[0].products.product_1._ref === item._id)[0],
    productsRef.filter(item => allPostsData[0].products.product_2._ref === item._id)[0],
    productsRef.filter(item => allPostsData[0].products.product_3._ref === item._id)[0]
  ]

  return {
    props: {
      homepage: allPostsData[0]
    }
  }
}

const Homepage = ({homepage}) => {

  if(!homepage){
    return <Loader />
  }

  let linkAction = ''

  if(homepage.actionSlug){
    let type = homepage.actionSlug._type

    if(type === 'article'){
      linkAction = `/${homepage.actionSlug.slug}/novinky/clanek`
    }else if(type === 'recepts'){
      linkAction = `/${homepage.actionSlug.slug}/recept`
    }else if(type === 'product'){
      linkAction = `/${homepage.actionSlug.slug}/odstavnovace/product`
    }else if(type === 'category'){
      linkAction = `/${homepage.actionSlug.slug}`
    }else{
      linkAction = `/${homepage.actionSlug.slug}/kategorie`
    }
  }

  return (
    <Page title={homepage?.meta?.head} description={homepage?.meta?.description} image={urlFor(homepage.image).url()}>
      <Head>
        <meta name="facebook-domain-verification" content="4f4qsko4ma7tqfey9dnsz59m9aqzok" />
        <meta name="google-site-verification" content="su2uX9qqw6aaN9oFzigGJKVgFbbsjWO_oh79jyXm1KI" />
      </Head>
      <div className="uk-inline uk-width-1-1 uk-margin-large-bottom">
        <div className="uk-cover-container uk-height-large container-height-top">
          <img
            className="uk-cover uk-img"
            data-src={urlFor(homepage.image).auto('format').url()}
            data-srcset={`${urlFor(homepage.image).width(400).auto('format').url()} 400w,
                      ${urlFor(homepage.image).width(640).auto('format').url()} 640w,
                      ${urlFor(homepage.image).width(900).auto('format').url()} 900w,
                      ${urlFor(homepage.image).width(1000).auto('format').url()} 1000w,
                      ${urlFor(homepage.image).width(1600).auto('format').url()} 1600w,
                      ${urlFor(homepage.image).width(2000).auto('format').url()} 2000w`}
            alt={homepage.title}
            uk-cover=""
            uk-img="" />
        </div>
        <div className="uk-overlay-primary uk-position-cover"></div>
        <div className="uk-overlay uk-position-center uk-text-center uk-light">
          <h1 className="uk-margin-large-bottom shadow_text">{homepage.title}</h1>
          {!!linkAction.length && <Button link={linkAction} text={homepage.textButton} type="negative" />}
        </div>
      </div>
      <div className="uk-container">

        {homepage.baners.map((item, index) => <ArticleShort key={index} data={item} links={homepage.banerLinks} reverse={!(index % 2)} />)}

        <h2 className="uk-margin-xlarge-top uk-margin-large-bottom uk-text-center">Populární modely Hurom</h2>
        <div className="uk-grid uk-child-width-1-3@m uk-child-width-1-1" uk-grid="" uk-height-match="target: > div > .card > .card-content-wrap">
          {!!homepage.productsRef.length && homepage.productsRef.map((item, index) => <div key={index}>
            <Card data={item} />
          </div>)}
        </div>

      </div>
    </Page>
  )
}


export default Homepage
