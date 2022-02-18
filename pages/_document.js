import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="cs">
        <Head>
          {/* <!-- Google Tag Manager --> */}
          {/* <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WJJLLH9');`}} /> */}
          {/* <!-- End Google Tag Manager --> */}

          {/* <!-- Google Tag Manager LOCAL --> */}
          <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PX3ZV34');`}} />
            <script></script>
            {/* <!-- End Google Tag Manager LOCAL --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJJLLH9"
          height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript> */}
          {/* <!-- End Google Tag Manager (noscript) --> */}

          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PX3ZV34"
          height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
