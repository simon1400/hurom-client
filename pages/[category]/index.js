import sanityClient from "../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";

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

export async function getStaticPaths() {
  const paths = [
    {params: {category: 'odstavnovace'}},
    {params: {category: 'recepty'}},
    {params: {category: 'novinky'}}
  ]
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  var items = [],
      breadTitle = '',
      pathCategory = params.category,
      category = '',
      meta = {},
      globalCategory

  if(pathCategory === 'odstavnovace'){
    category = await sanityClient.fetch(settingCategoryProduct)
    globalCategory = category
    items = await sanityClient.fetch(queryProducts)
    breadTitle = 'Odšťavňovače'
    meta = {title: 'Odšťavňovače', description: 'Odšťavňovače'}
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
    window.location.href = '/not-found'
  }

  return {
    props: {
      meta,
      items,
      globalCategory,
      dataBread: [{title: breadTitle}],
      match: params
    }
  }
}

const Category = ({globalCategory, items, dataBread, meta, match}) => {

  if(items?.length){
    return <Page title={meta.title} description={meta.description} image={globalCategory?.imageUrl}>
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
