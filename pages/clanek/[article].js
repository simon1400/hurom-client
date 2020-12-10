import loadable from '@loadable/component'
import sanityClient from "../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import query from '../../queries/article'

const ArticleShort = loadable(() => import('../../components/Article'))
const Loader = loadable(() => import('../../components/Loader'))
const Page = loadable(() => import('../../layout/page'))
const PageHead = loadable(() => import('../../components/PageHead'))

export async function getStaticPaths() {

  const data = await sanityClient.fetch(`{
    'article': *[_type == "article"]{slug},
    'baseArticle': *[_type == "baseArticle"]{slug},
  }`)

  const paths = []

  data.article.map(item => paths.push({params: {article: item.slug.current}}))
  data.baseArticle.map(item => paths.push({params: {article: item.slug.current}}))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  const data = await sanityClient.fetch(query, {url: params.article})

  if(!data.length){
    window.location.href = '/not-found'
    return
  }
  let breadData = [{
    title: data[0].title
  }]
  if(data[0]._type === 'article'){
    breadData.unshift({
      link: `/novinky`,
      title: 'Novinky'
    })
  }

  return {
    props: {
      breadData,
      article: data[0]
    }
  }
}

const Article = ({dataBread, article}) => {

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
