import { useState, useEffect } from 'react';
import Head from 'next/head'
import sanityClient from "../lib/sanity.js";

import Header from './header'
import Footer from './footer'
import Canvas from './canvas'
import Search from './search'
import query from '../queries/page'

const Page = ({
  children,
  id,
  className,
  title,
  description,
  image,
  twitter,
  contentType,
  published,
  category,
  updated,
  noCrawl,
  tags
}) => {

  const [global, setGlobal] = useState({
    site_url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hurom.cz',
    facebook_app_id: '',
    defaultTitle: 'HUROM',
    defaultDescription: 'Hurom',
    defaultImage: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hurom.cz'}`,
    defaultTwitter: '@cereallarceny',
    defaultSep: ' '
  })

  useEffect(() => {
    sanityClient.fetch(query).then(res => {
      setGlobal({
        ...global,
        defaultTitle: res[1].endTitle || 'HUROM'
      })
    })
  }, [])

  const theTitle = title ? (title + global.defaultSep + global.defaultTitle).substring(0, 60) : global.defaultTitle;
  const theDescription = description ? description.substring(0, 155) : global.defaultDescription;
  const theImage = image ? image : global.defaultImage;

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{theTitle}</title>
        <link rel="canonical" href={window.location.href} />
        <meta itemprop="name" content={theTitle} />
        <meta itemprop="description" content={theDescription} />
        <meta itemprop="image" content={theImage} />
        <meta name="description" content={theDescription} />
        {/*<meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={global.defaultTwitter} />
        <meta name="twitter:title" content={theTitle} />
        <meta name="twitter:description" content={theDescription} />
        <meta name="twitter:creator" content={twitter || global.defaultTwitter} />
        <meta name="twitter:image:src" content={theImage} />*/}
        <meta property="og:title" content={theTitle} />
        <meta property="og:type" content={contentType || 'website'} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={theImage} />
        <meta property="og:description" content={theDescription} />
        <meta property="og:site_name" content="HUROM" />
        <meta property="fb:app_id" content={global.facebook_app_id} />

        {published && <meta name="article:published_time" content={published} />}
        {category && <meta name="article:section" content={category} />}
        {updated && <meta name="article:modified_time" content={updated} />}
        {noCrawl && <meta name="robots" content="noindex, nofollow" />}
        {tags && <meta name="article:tag" content={tags} />}

      </Head>
      <Header />
      <main id={id} className={className}>
        {children}
      </main>
      <Footer />
      <Canvas />
      <Search />
    </div>
  );
}


export default Page
