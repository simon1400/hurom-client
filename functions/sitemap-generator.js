require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../lib/sanity").default;
const axios = require('axios')
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;


const query = `{
  'product': *[_type == "product"]{slug},
  'recepts': *[_type == "recepts"]{slug},
  'article': *[_type == "article"]{slug},
  'baseArticle': *[_type == "baseArticle"]{slug},
}`;

async function getData() {
  const res = await sanityClient.fetch(query)
  return {
    product: res.product,
    recepts: res.recepts,
    article: res.article,
    baseArticle: res.baseArticle
  }
}

async function generateSitemap() {
  try{
    const result = await getData()

    let paramsProduct = [];
    let paramsRecepts = [];
    let paramsArticles = [];
    let paramsBaseArticle = [];

    for(var i = 0; i < result.product.length; i++) {
      paramsProduct.push({ product: result.product[i].slug.current });
    }
    for(var i = 0; i < result.recepts.length; i++) {
      paramsRecepts.push({ recept: result.recepts[i].slug.current });
    }
    for(var i = 0; i < result.article.length; i++) {
      paramsArticles.push({ url: result.article[i].slug.current });
    }
    for(var i = 0; i < result.baseArticle.length; i++) {
      paramsBaseArticle.push({ url: result.baseArticle[i].slug.current });
    }

    const paramsConfig = {
      "/odstavnovac/:product": paramsProduct,
      "/recept/:recept": paramsRecepts,
      "/clanek/:url": [...paramsArticles, ...paramsBaseArticle]
    };

    var path = './public/sitemap.xml'

    return (
      new Sitemap(router)
        .applyParams(paramsConfig)
        .build("https://hurom.cz")
        .save(path)
    );
  }catch(e){
    console.log(e);
  }
}

generateSitemap();
