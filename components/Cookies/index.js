import {useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'

const Cookies = () => {

  const { dataContextDispatch } = useContext(DataStateContext)

  const handleCookies = (e, more = false) => {
    e.preventDefault()
    if(more){
      window.location.href = '/clanek/ochrana-osobnich-udaju'
      return
    }

    dataContextDispatch({ state: true, type: 'cookies' })
  }

  return (
    <div className="cookies" onClick={(e) => handleCookies(e)}>
      <p>Tyto webové stránky používají k poskytování služeb a analýze návštěvnosti soubory cookies,
        <a href="/clanek/ochrana-osobnich-udaju" onClick={(e) => handleCookies(e, true)}>další informace</a>.<img className="uk-svg" src="/assets/times.svg" uk-svg="" />
      </p>
    </div>
  )
}

export default Cookies
