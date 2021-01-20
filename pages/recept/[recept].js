import sanityClient from "../../lib/sanity.js";

import query from '../../queries/recept'

import Page from '../../layout/page'
import ArticleShort from '../../components/Article'
import Breadcrumb from '../../components/breadcrump'
import Loader from '../../components/Loader'

// export async function getStaticPaths() {
//
//   const data = await sanityClient.fetch(`*[_type == "recepts"]{"slug": slug.current}`)
//
//   const paths = []
//
//   data.map(item => paths.push({params: {recept: item.slug}}))
//
//   return {
//     paths,
//     fallback: false
//   }
// }

export async function getServerSideProps({ params }) {

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
