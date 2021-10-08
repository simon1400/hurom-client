require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../lib/sanity").default;
const imageUrlBuilder = require("@sanity/image-url");
const axios = require('axios')
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = (source) => imageBuilder.image(source)
const feedWrite = require("./feedWrite").default
const toXmlHeureka = require('./toXmlHeurekaFeed').default
const toXmlGoogle = require('./toXmlGoogleFeed').default
const toXmlZbozi = require('./toXmlZboziFeed').default
const toXmlFacebook = require('./toXmlFacebookFeed').default
const toXmlGlobal = require('./toXmlGlobalFeed').default
const toXmlMall = require('./toXmlMall').default
const toXmlMallStock = require('./toXmlMallStock').default

function toPlainText(blocks = []) {
  return blocks.map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    }).join('\n\n')
}

async function generateFeed() {
  try{
    const products = await sanityClient.fetch(`*[_type == "product"]{
      _id,
      title,
      slug,
      image,
      slider,
      ean,
      stock,
      variants,
      descriptions,
      content,
      benefits,
      price,
      parametry,
      "gift": *[_type == 'gift' && _id == ^.gift._ref]{title, image},
      "param": *[_type == 'param' && _id in ^.parametry[].parameter._ref]{head, value, _id},
      galery,
      "accessories": *[_type == 'accessories' && _id in ^.accessories[]._ref]{title, image, "slug": slug.current, price},
      meta
    }`)

    let productsData = [];

    for(var i = 0; i < products.length; i++) {
      var productVariants = [], dataObj = {}, articleItem = {};
      if(products[i].variants && products[i].variants.length){
        for(var a = 0; a < products[i].variants.length; a++){
          articleItem = {}
          dataObj = {
            id: products[i].variants[a]._key,
            parentId: products[i]._id,
            parentTitle: products[i].title,
            title: products[i].title + ' | ' + products[i].variants[a].title,
            description: products[i].meta ? products[i].meta.description : '',
            link: 'https://hurom.cz/odstavnovac/' + products[i].slug.current + '?variant=' + products[i].variants[a].title.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            image_link: urlFor(products[i].variants[a].image).url(),
            params: products[i].param,
            globalText: toPlainText(products[i].content),
            parametry: products[i].parametry,
            stock: products[i].variants[a].stock,
            price: products[i].price,
            mpn: products[i].variants[a]._key.split('-').join(''),
            ean: products[i].variants[a].ean ? products[i].variants[a].ean : '',
            gift: products[i].gift
          }
          if(products[i].variants[a].galery && products[i].variants[a].galery.length) {
            dataObj.slider = products[i].variants[a].galery.map(item => urlFor(item).url())
          }
          if(products[i].galery && products[i].galery.length){
            dataObj.galeryAll = products[i].galery.map(item => urlFor(item).url())
          }
          if(products[i].descriptions && products[i].descriptions.length){
            dataObj.articles = products[i].descriptions.map(item => {
              articleItem = {
                id: item._key,
                text: toPlainText(item.content),
                label: item.description,
                image: urlFor(item.image).url(),
                title: item.title
              }
              if(item.video && item.video.length){
                articleItem.videoEmbedCode = item.video
              }
              return articleItem
            })
          }
          productVariants.push(dataObj)
        }
      }else if(products[i].price > 0 && (!products[i].variants || !products[i].variants.length)){
        dataObj = {
          id: products[i]._id,
          title: products[i].title,
          description: products[i].meta ? products[i].meta.description : '',
          link: 'https://hurom.cz/odstavnovac/' + products[i].slug.current ,
          image_link: urlFor(products[i].image).url(),
          params: products[i].param,
          globalText: toPlainText(products[i].content),
          parametry: products[i].parametry,
          stock: products[i].stock,
          ean: products[i].ean ? products[i].ean : '',
          price: products[i].price,
          mpn: products[i]._id.split('-').join(''),
          gift: products[i].gift
        }
        if(products[i].slider && products[i].slider.length){
          dataObj.slider = products[i].slider.map(item => urlFor(item).url())
        }
        if(products[i].galery && products[i].galery.length){
          dataObj.galeryAll = products[i].galery.map(item => urlFor(item).url())
        }
        if(products[i].descriptions && products[i].descriptions.length){
          dataObj.articles = products[i].descriptions.map(item => {
            articleItem = {
              id: item._key,
              text: toPlainText(item.content),
              label: item.description,
              image: urlFor(item.image).url(),
              title: item.title
            }
            if(item.video && item.video.length){
              articleItem.videoEmbedCode = item.video
            }
            return articleItem
          })
        }
        productsData.push(dataObj);
      }
      productsData.push(...productVariants)
    }

    const xmlHeureka = toXmlHeureka(productsData)
    const xmlGoogle = toXmlGoogle(productsData)
    const xmlZbozi = toXmlZbozi(productsData)
    const xmlFacebook = toXmlFacebook(productsData)
    const xmlGlobal = toXmlGlobal(productsData)
    const xmlMall = toXmlMall(productsData)
    const xmlMallStock = toXmlMallStock(productsData)

    var pathHeureka = './public/heureka-feed.xml'
    var pathGoogle = './public/google-feed.xml'
    var pathZbozi = './public/zbozi-feed.xml'
    var pathFacebook = './public/facebook-feed.xml'
    var pathGlobal = './public/global-feed.xml'
    var pathMall = './public/mall-feed.xml'
    var pathMallStock = './public/mall-stock.xml'

    feedWrite(pathHeureka, xmlHeureka)
    feedWrite(pathGoogle, xmlGoogle)
    feedWrite(pathZbozi, xmlZbozi)
    feedWrite(pathFacebook, xmlFacebook)
    feedWrite(pathGlobal, xmlGlobal)
    feedWrite(pathMall, xmlMall)
    feedWrite(pathMallStock, xmlMallStock)

  }catch(e){
    console.log(e);
  }
}

generateFeed();
