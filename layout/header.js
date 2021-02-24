import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import { DataStateContext } from '../context/dataStateContext'
import { useRouter } from 'next/router'

const Header = () => {

  const router = useRouter()
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [menu, setMenu] = useState(false)
  const [basket, setBasket] = useState([])
  const urlParse = () => router.asPath.split('/')

  const handleSearch = () => {
    dataContextDispatch({state: {searchFocus: true}, type: 'state'})
  }

  useEffect(() => {
    setBasket(dataContextState?.basket)
  }, [])

  return (
    <header>
      <div className="uk-container">
        <div className="nav-wrap">
          {router.asPath !== '/kosik' && router.asPath !== '/objednavka' &&<div className="uk-hidden@m uk-flex">
             <button className={`hamburger hamburger--spring ${menu && 'is-active'}`} type="button" onClick={() => setMenu(!menu)} aria-label="Hamburger">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            <div className={`menu-mobile ${menu && 'menu-mobile-active'}`}>
               <ul>
                <li className={urlParse().indexOf('odstavnovace') >= 0 ? 'active-menu' : ''} onClick={() => setMenu(!menu)}>
                  <Link href="/odstavnovace"><a><span>Produkty</span></a></Link>
                </li>
                <li className={urlParse().indexOf('proc-hurom') >= 0 ? 'active-menu' : ''} onClick={() => setMenu(!menu)}>
                  <Link href="/clanek/proc-hurom"><a><span>Proč Hurom</span></a></Link>
                </li>
                <li className={urlParse().indexOf('vyzkousejte-hurom') >= 0 ? 'active-menu' : ''} onClick={() => setMenu(!menu)}>
                  <Link href="/clanek/vyzkousejte-hurom"><a>Vyzkoušejte Hurom</a></Link>
                </li>
                <li className={urlParse().indexOf('recepty') >= 0 ? 'active-menu' : ''} onClick={() => setMenu(!menu)}>
                  <Link href="/recepty"><a><span>Recepty</span></a></Link>
                </li>
                <li className={urlParse().indexOf('novinky') >= 0 ? 'active-menu' : ''} onClick={() => setMenu(!menu)}>
                  <Link href="/novinky"><a><span>Novinky</span></a></Link>
                </li>
                <li className={urlParse().indexOf('kontakt') >= 0 ? 'active-menu' : ''} onClick={() => setMenu(!menu)}>
                  <Link href="/clanek/kontakt"><a><span>Kontakt</span></a></Link>
                </li>

              </ul>
            </div>
          </div>}
          <Link href="/"><a className="logo"><img src="/assets/logo.svg" alt="Logo"/></a></Link>
          {router.asPath !== '/kosik' && router.asPath !== '/objednavka' && <nav className="uk-visible@m">
             <ul>
              <li className={urlParse().indexOf('odstavnovace') >= 0 ? 'active-menu' : ''}>
                <Link href="/odstavnovace"><a>Produkty</a></Link>
              </li>
              <li className={urlParse().indexOf('proc-hurom') >= 0 ? 'active-menu' : ''}>
                <Link href="/clanek/proc-hurom"><a>Proč Hurom</a></Link>
              </li>
              <li className={urlParse().indexOf('vyzkousejte-hurom') >= 0 ? 'active-menu' : ''}>
                <Link href="/clanek/vyzkousejte-hurom"><a>Vyzkoušejte Hurom</a></Link>
              </li>
              <li className={urlParse().indexOf('recepty') >= 0 ? 'active-menu' : ''}>
                <Link href="/recepty"><a>Recepty</a></Link>
              </li>
              <li className={urlParse().indexOf('novinky') >= 0 ? 'active-menu' : ''}>
                <Link href="/novinky"><a>Novinky</a></Link>
              </li>
              <li className={urlParse().indexOf('kontakt') >= 0 ? 'active-menu' : ''}>
                <Link href="/clanek/kontakt"><a>Kontakt</a></Link>
              </li>
            </ul>
          </nav>}
          {router.asPath !== '/kosik' && router.asPath !== '/objednavka' &&<div className="icons-wrap">
             <ul>
              <li><a href="/" uk-toggle="target: #search" onClick={() => handleSearch()}><img src="/assets/search.svg" uk-svg="" alt="Search icon" /></a></li>
              {/*<li>
                {!Array.isArray(dataContextState.user) && <a href="/user"><img src="/assets/user.svg" uk-svg="" alt="User icon" /></a>}
                {Array.isArray(dataContextState.user) && <a href="#" uk-toggle="target: #login"><img src="/assets/user.svg" uk-svg="" alt="User icon" /></a>}
              </li>*/}
              <li className={`basket-icon-wrap ${!basket.length && 'empty-basket-icon'}`}>
                <a href="/" uk-toggle="target: #canvas">
                  <img src="/assets/shopping-bag.svg" uk-svg="" alt="Basket icon" />
                  <span></span>
                </a>
              </li>
            </ul>
          </div>}
          {(router.asPath === '/kosik' || router.asPath === '/objednavka') && <div className="back-catalog-wrap uk-width-1-1 uk-text-right">
            <a href="/odstavnovace" className="button bare"><img src="/assets/angle-left.svg" alt="left" className="uk-svg" uk-svg="" /> zpět k nákupu</a>
          </div>}
        </div>
      </div>
    </header>
  )
}

export default Header
