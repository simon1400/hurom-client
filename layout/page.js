import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import sanityClient from "../lib/sanity.js";
import { useRouter } from 'next/router'

import { DataStateContext } from '../context/dataStateContext'

import Header from './header'
import Footer from './footer'
import Canvas from './canvas'
import Search from './search'
import CookieConsent from '../components/CookieConsent'

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

  const { dataContextState } = useContext(DataStateContext)
  const router = useRouter()
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
      
        {/* <!-- Google Tag Manager --> */}
        <script type="text/plain" data-cookiecategory="analytics" dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WJJLLH9');`}} />
        {/* <!-- End Google Tag Manager --> */}

        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.js"></script>

        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />

        <link rel="stylesheet preload prefetch" href="/fonts.css" as="style" type="text/css" crossOrigin="anonymous" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#80bd01" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{theTitle}</title>
        <link rel="canonical" href={global.site_url+router.asPath} />
        <meta itemProp="name" content={theTitle} />
        <meta itemProp="description" content={theDescription} />
        <meta itemProp="image" content={theImage} />
        <meta name="description" content={theDescription} />
        {/*<meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={global.defaultTwitter} />
        <meta name="twitter:title" content={theTitle} />
        <meta name="twitter:description" content={theDescription} />
        <meta name="twitter:creator" content={twitter || global.defaultTwitter} />
        <meta name="twitter:image:src" content={theImage} />*/}
        <meta property="og:title" content={theTitle} />
        <meta property="og:type" content={contentType || 'website'} />
        <meta property="og:url" content={global.site_url+router.asPath} />
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
      <main id={id} className={className}>{children}</main>
      <Footer />
      <Canvas />
      <Search />
      <CookieConsent />
    </div>
  );
}


export default Page
