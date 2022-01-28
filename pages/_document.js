import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="cs">
        <Head />
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJJLLH9"
          height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
