import React, {useState, useEffect, useContext} from 'react'
import loadable from '@loadable/component'
import {AxiosAPI} from '../../restClient'
import { DataStateContext } from '../../context/dataStateContext'
import getUrl from '../../function/getSearch'
// import dataSend from '../../function/gtag'
import Head from 'next/head'

const Button = loadable(() => import('../../components/Button'))
const Page = loadable(() => import('../../layout/page'))

const script = (order) => {

  const script = document.createElement('script');

  script.async = true;
  var products = ''
  order.basket.map(item => products += `_hrq.push(['addProduct', '${item.nameProduct}${item.variantProduct ? ' - ' + item.variantProduct : ''}', '${item.price}', '${item.count}', '${item.id}']);`)
  script.innerHTML = `var _hrq = _hrq || [];
      _hrq.push(['setKey', '982154816664C09B9691FCFA69037EE7']);
      _hrq.push(['setOrderId', ${order.idOrder}]);
      ${products}
      _hrq.push(['trackOrder']);

    (function() {
        var ho = document.createElement('script'); ho.type = 'text/javascript'; ho.async = true;
        ho.src = 'https://im9.cz/js/ext/1-roi-async.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ho, s);
    })();`;

    return script
}

export async function getServerSideProps({query}) {

  if(!query.refId === undefined){
    return {
      redirect: {
        permanent: false,
        destination: '/not-found'
      }
    }
  }

  const res = await AxiosAPI.get(`/payment/status/${query.refId}`)

  await AxiosAPI.post('/send/orderInfo', res.data.data[0])

  var basItem
  var orderBasket = res.data.data[0].basket.map((item, index) => {
    basItem = {
      id: item.id,
      name: item.nameProduct,
      brand: "Hurom",
      list_position: index + 1,
      quantity: item.count,
      price: item.price
    }
    if(item.variantProduct){
      basItem.variant = item.variantProduct
    }
    return basItem
  })

  return {
    props: {
      order: res.data.data[0],
      orderBasket
    }
  }
}

const ThankYou = ({order, orderBasket}) => {

  const [status, setStatus] = useState('')
  const [price, setPrice] = useState('')

  const { dataContextDispatch } = useContext(DataStateContext)

  useEffect(() => {

    dataContextDispatch({ state: [], type: 'basket' })
    dataContextDispatch({ state: 0, type: 'basketCount' })

    if(order.payOnline) {
      setStatus(order.status)
      if(order.status !== 'PENDING' && order.status !== 'CANCELLED'){
        setPrice(order.sum)
        // document.body.appendChild(script(order));
      }
    }else{
      setStatus('dobirka')
      setPrice(order.sum)
      // document.body.appendChild(script(order));
    }

    if(window !== undefined){
      const data = {
        transaction_id: order.idOrder,
        affiliation: "Hurom",
        value: order.sum - (order.sum * 0.21),
        currency: 'CZK',
        tax: order.sum * 0.21,
        shipping: order.deliveryPrice,
        items: orderBasket
      }
      window.dataLayer?.push({
        event: 'purchase',
        ...data,
      });
    }

    return () => {
      // document.body.removeChild(script);
    }

  }, [])

  return(
    <Page title="Dokončená objednávka">
      <Head>
        {/* {price > 0 && <script dangerouslySetInnerHTML={{__html: `var seznam_cId = 100071362; var seznam_value = ${price};`}} />} */}
        {/* {price > 0 && <script type="text/javascript" src="https://www.seznam.cz/rs/static/rc.js" async></script>} */}
        {/* <script dangerouslySetInnerHTML={{__html: `gtag('event', 'purchase', {
          transaction_id: ${order.idOrder},
          affiliation: "Hurom",
          value: ${order.sum - (order.sum * 0.21)},
          currency: 'CZK',
          tax: ${order.sum * 0.21},
          shipping: ${order.deliveryPrice},
          items: ${JSON.stringify(orderBasket)}
        })`}} /> */}
      </Head>
      <div className="uk-container uk-margin-xlarge-top">
        <div className="uk-grid uk-child-width-1-1" uk-grid="">
          <div className="uk-text-center">
            <h1>Děkujeme za Vaši objednávku</h1>
            <p>Na Vámi uvedený e-mail bylo zasláno potvrzení o provedené objednávce.</p>
            {!!status.length && status === 'PENDING' && <div className="uk-text-warning">Čeká na zaplacení</div>}
            {!!status.length && status === 'CANCELLED' && <div className="uk-text-danger">Platba se nezdařila</div>}
            {!!status.length && status === 'PAID' && <div className="uk-text-success">Platba zaplacena</div>}
            {!!status.length && status === 'dobirka' && <div className="uk-text-success">Platba na dobírku</div>}
            <div className="uk-margin-medium-top"><Button link="/" text="Zpět na hlavní stránku" type="primary" /></div>
          </div>
        </div>
      </div>
    </Page>
  )

}

export default ThankYou
