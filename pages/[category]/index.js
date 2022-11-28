import sanityClient from "../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import Head from 'next/head'

import {
  settingCategoryProduct,
  settingCategoryArticles,
  queryProducts,
  queryArticles,
  queryRecepts
} from '../../queries/category'

import ArticleShort from '../../components/Article'
import Loader from '../../components/Loader'
import Page from '../../layout/page'
import PageHead from '../../components/PageHead'
import Card from '../../components/Card'
import Recept from '../../components/Recept'

export async function getServerSideProps({ params }) {

  var items = [],
      breadTitle = '',
      pathCategory = params.category,
      category = '',
      meta = {},
      globalCategory,
      valueGTM = false,
      idsGTM = []

  if(pathCategory === 'odstavnovace'){
    category = await sanityClient.fetch(settingCategoryProduct)
    globalCategory = category
    items = await sanityClient.fetch(queryProducts)
    breadTitle = 'Odšťavňovače'
    meta = {title: 'Odšťavňovače', description: 'Odšťavňovače'}
    valueGTM = items.reduce((a, b) => +a+b.price, '')
    items.map(item => {
      if(!item.variants?.length){
        idsGTM.push(item._id)
      }else{
        item.variants.map(variant => {
          idsGTM.push(variant._key)
        })
      }
    })
  }else if(pathCategory === 'recepty'){
    category = await sanityClient.fetch(settingCategoryArticles)
    globalCategory = category.settingRecept
    items = await sanityClient.fetch(queryRecepts)
    breadTitle = 'Recepty'
    meta = {title: 'Recepty', description: 'Recepty'}
  }else if(pathCategory === 'novinky'){
    category = await sanityClient.fetch(settingCategoryArticles)
    globalCategory = category.settingShortArticles
    items = await sanityClient.fetch(queryArticles)
    breadTitle = 'Novinky'
    meta = {title: 'Novinky', description: 'Novinky'}
  }else{
    return {
      notFound: true,
    }
  }

  return {
    props: {
      meta,
      items,
      globalCategory,
      dataBread: [{title: breadTitle}],
      match: params,
      valueGTM,
      idsGTM
    }
  }
}

const Category = ({globalCategory, items, dataBread, meta, match, valueGTM, idsGTM}) => {

  if(items?.length){
    return <Page
            title={meta.title}
            description={meta.description}
            image={globalCategory?.imageUrl}
          >
      <PageHead data={globalCategory} dataBread={dataBread} className="category-head" />
      <div className="uk-container uk-margin-medium-bottom">
        <div className="uk-grid uk-child-width-1-2 uk-child-width-1-3@m" uk-grid="" uk-height-match="target: > div > .card > .card-content-wrap">
          {match.category === 'odstavnovace' && items.map((item, index) => <div key={index}><Card data={item} /></div>)}
          {match.category === 'recepty' && items.map((item, index) => <div key={index}><Recept data={item} /></div>)}
        </div>
      </div>
      <div className="uk-container uk-margin-xlarge-bottom">
        {match.category === 'novinky' && items.map((item, index) => <ArticleShort key={index} data={item} reverse={!(index % 2)} shortLink={true} />)}
      </div>
      <div className="uk-container uk-container-small">
        <BlockContent blocks={globalCategory.content} />
      </div>
    </Page>
  }else{
    return <Loader />
  }

}


export default Category
