import React, {useState, useEffect, useContext} from 'react'
import loadable from '@loadable/component'
import { DataStateContext } from '../../context/dataStateContext'
import Link from 'next/link'

const CanvasItem = loadable(() => import('../../components/canvasItem'))

const Canvas = () => {

  const [canvasItems, setCanvasItems] = useState([])

  const { dataContextState } = useContext(DataStateContext)
  const [sum, setSum] = useState(0)

  useEffect(() => {
    setCanvasItems(dataContextState.basket)
    var startSum = 0
    dataContextState.basket.map(item => {
      startSum += +item.price * +item.count
    })
    setSum(startSum)
  }, [dataContextState, dataContextState.basket.length])

  return (
    <div id="canvas" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar">
        <div className="uk-flex uk-flex-between">
          <div className="canvas-head uk-flex uk-flex-left uk-flex-middle">
            <h3 className="uk-h4">Košík</h3>
          </div>
          <button className="uk-offcanvas-close uk-close-large" type="button" uk-close=""></button>
        </div>
        <hr />
        <div className="canvas-content-wrap">
          {!!canvasItems.length ? canvasItems.map((item, index) => <CanvasItem key={index} data={item} index={index} />) : 'Váš košík je prázdný.'}
        </div>
        {!!canvasItems.length && <hr className="uk-margin-remove-bottom"/>}
        {!!canvasItems.length && <table className="uk-table uk-table-divider uk-margin-remove-vertical">
          <tbody>
            <tr>
              <td>Doprava</td>
              <td className="uk-text-right">
                <span className="green-text">ZDARMA</span>
              </td>
            </tr>
            <tr>
              <td>Platba</td>
              <td className="uk-text-right">
                <span className="green-text">ZDARMA</span>
              </td>
            </tr>
            <tr>
              <td>Celková cena</td>
              <td className="uk-text-right price-color">{sum.toLocaleString()} Kč</td>
            </tr>
          </tbody>
        </table>}
        {!!canvasItems.length && <div className="canvas-buttons-wrap uk-margin-top uk-flex uk-flex-between">
          {/* <a href="/kosik" className="button border-button">Do košíku</a> */}
          <Link href="/objednavka"><a className="button primary">K objednávce</a></Link>
        </div>}
      </div>
    </div>
  )
}

export default Canvas
