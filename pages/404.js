import React, {useState, useEffect} from 'react'
import sanityClient from "../lib/sanity.js";

import query from '../queries/notFound'

import Loader from '../components/Loader'
import Page from '../layout/page'
import Button from '../components/Button'

const NotFound = () => {

  const [data, setData] = useState()

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setData(data[1].notFound)
    })
  }, [])

  if(data){
    return(
      <Page title={data.meta?.head} description="Stranka neexistuje">
        <div className="uk-container uk-margin-xlarge-top">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div className="uk-text-center uk-margin">
              <h1>{data.title}</h1>
              <p>{data.text}</p>
              <div className="uk-margin-large-top"><Button link="/" text="Zpět na hlavní stránku" type="primary" /></div>
            </div>
          </div>
        </div>
      </Page>
    )
  }else{
    return <Loader />
  }

}


export default NotFound
