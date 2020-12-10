import loadable from '@loadable/component'
import sanityClient from "../../lib/sanity.js";

import query from '../../queries/recept'

const Page = loadable(() => import('../../layout/page'))
const ArticleShort = loadable(() => import('../../components/Article'))
const Breadcrumb = loadable(() => import('../../components/breadcrump'))
const Loader = loadable(() => import('../../components/Loader'))

export async function getStaticPaths() {

  const data = await sanityClient.fetch(`*[_type == "recepts"]{"slug": slug.current}`)

  const paths = []

  data.map(item => paths.push({params: {recept: item.slug}}))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  const data = await sanityClient.fetch(query, {url: params.recept})

  if(!data.length){
    window.location.href = '/not-found'
    return
  }
  const dataBread = [
    {
      link: `/recepty`,
      title: 'Recepty'
    },
    {
      title: data[0].title
    }
  ]

  return {
    props: {
      dataBread,
      recept: data[0]
    }
  }
}

const Recept = ({dataBread, recept}) => {

  if(recept){
    return <Page title={recept?.meta?.head} description={recept?.meta?.description} image={recept?.imageUrl}>
      <Breadcrumb data={dataBread} />
      <div className="uk-container uk-margin-large-top">
        <ArticleShort data={{
            title: recept.title,
            content: recept.content,
            ingredience: recept.ingredience,
            image: recept.image
          }} recept={true} reverse={true} />
        <ArticleShort data={{
            content: recept.procedure,
            image: recept.aditionalImage,
            description: 'postup'
          }} recept={true}/>
      </div>
    </Page>
  }else{
    return <Loader />
  }

}


export default Recept
