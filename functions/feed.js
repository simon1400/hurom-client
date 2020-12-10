require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../src/lib/sanity").default;
const imageUrlBuilder = require("@sanity/image-url");
const axios = require('axios')
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = (source) => imageBuilder.image(source)
const toXmlHeureka = require('./toXmlHeurekaFeed').default
const toXmlGoogle = require('./toXmlGoogleFeed').default
const toXmlZbozi = require('./toXmlZboziFeed').default
fs = require('fs');

async function generateFeed() {
  try{
    const products = await sanityClient.fetch(`*[_type == "product"]{
      _id,
      title,
      slug,
      image,
      ean,
      variants,
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

      var productVariants = []

      if(products[i].variants && products[i].variants.length){
        for(var a = 0; a < products[i].variants.length; a++){
          productVariants.push({
            id: products[i].variants[a]._key+a+(i+6),
            title: products[i].title + ' - ' + products[i].variants[a].title,
            description: products[i].meta ? products[i].meta.description : '',
            link: 'https://hurom.cz/' + products[i].slug.current + '/odstavnovac?variant=' + products[i].variants[a].title.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            image_link: urlFor(products[i].variants[a].image).url(),
            params: products[i].param,
            parametry: products[i].parametry,
            price: products[i].price,
            mpn: products[i].variants[a]._key.split('-').join('')+i+a,
            ean: products[i].variants[a].ean ? products[i].variants[a].ean : '',
            gift: products[i].gift
          })
        }
      }else if(products[i].price > 0 && !products[i].variants){
        productsData.push({
          id: products[i]._id,
          title: products[i].title,
          description: products[i].meta ? products[i].meta.description : '',
          link: 'https://hurom.cz/' + products[i].slug.current + '/odstavnovac',
          image_link: urlFor(products[i].image).url(),
          params: products[i].param,
          parametry: products[i].parametry,
          ean: products[i].ean ? products[i].ean : '',
          price: products[i].price,
          mpn: products[i]._id.split('-').join('') + 'cz'+(i+3),
          gift: products[i].gift
        });
      }
      productsData.push(...productVariants)
    }

    const xmlHeureka = toXmlHeureka(productsData)
    const xmlGoogle = toXmlGoogle(productsData)
    const xmlZbozi = toXmlZbozi(productsData)

    var pathHeureka = './public/heureka-feed.xml'
    var pathGoogle = './public/google-feed.xml'
    var pathZbozi = './public/zbozi-feed.xml'
    if(process.env.NODE_ENV === 'prod'){
      pathHeureka = './build/heureka-feed.xml'
      pathGoogle = './build/google-feed.xml'
      pathZbozi = './build/zbozi-feed.xml'
    }

    fs.writeFile(pathHeureka, xmlHeureka, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathHeureka}`);
    });
    fs.writeFile(pathGoogle, xmlGoogle, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathGoogle}`);
    });
    fs.writeFile(pathZbozi, xmlZbozi, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathZbozi}`);
    });

  }catch(e){
    console.log(e);
  }
}

generateFeed();
