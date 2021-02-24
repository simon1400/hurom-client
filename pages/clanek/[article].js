import {useState, useEffect} from 'react'
import sanityClient from "../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import query from '../../queries/article'

import ArticleShort from '../../components/Article'
import Loader from '../../components/Loader'
import Page from '../../layout/page'
import PageHead from '../../components/PageHead'

// export async function getStaticPaths() {
//
//   const data = await sanityClient.fetch(`{
//     'article': *[_type == "article"]{slug},
//     'baseArticle': *[_type == "baseArticle"]{slug},
//   }`)
//
//   const paths = []
//
//   data.article.map(item => paths.push({params: {article: item.slug.current}}))
//   data.baseArticle.map(item => paths.push({params: {article: item.slug.current}}))
//
//   return {
//     paths,
//     fallback: false
//   }
// }

export async function getServerSideProps({ params }) {

  const data = await sanityClient.fetch(query, {url: params.article})

  if(!data.length){
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article: data[0]
    }
  }
}

const Article = ({article}) => {

  const [dataBread, setDataBread] = useState([])

  useEffect(() => {
    let breadData = [{
      title: article.title
    }]
    if(article._type === 'article'){
      breadData.unshift({
        link: `/novinky`,
        title: 'Novinky'
      })
    }
    setDataBread(breadData)
  }, [article])

  if(article){
    return <Page title={article?.meta?.head} description={article?.meta?.description} image={article?.imageUrl}>
      <PageHead big={true} data={article} dataBread={dataBread} />
      <div className="uk-container uk-container-xsmall">
        <div className="uk-text-center big-text">
          {article.content && <BlockContent blocks={article.content} />}
        </div>
      </div>
      <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
        {!!article.chapters?.length && article.chapters.map((item, index) => <ArticleShort key={index} inside={true} data={item} reverse={!(index % 2)}/>)}
      </div>
    </Page>
  }else{
    return <Loader />
  }

}


export default Article
