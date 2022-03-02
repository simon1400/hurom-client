import {useState, useEffect} from 'react'
import sanityClient from "../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

import query from '../queries/footer'

import Button from '../components/Button'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const Footer = () => {

  const [footer, setFooter] = useState()

  useEffect(() => {
    sanityClient.fetch(query).then(data => setFooter(data[1]))
  }, [])

  const handleCookies = (e) => {
    e.preventDefault()
    console.log(window.initCookieConsent());
    const cc = window.initCookieConsent();
    cc.showSettings(200)
  }

  if(footer){
    let linkAction = ''

    if(footer.actionSlug){
      let type = footer.actionSlug._type

      if(type === 'article'){
        linkAction = `/clanek/${footer.actionSlug.slug}`
      }else if(type === 'recepts'){
        linkAction = `/recept/${footer.actionSlug.slug}`
      }else if(type === 'product'){
        linkAction = `/odstavnovac/${footer.actionSlug.slug}`
      }else if(type === 'category'){
        linkAction = `/${footer.actionSlug.slug}`
      }
    }

    return (
      <footer className=" uk-margin-xlarge-top">

        <div className="uk-inline uk-width-1-1">
          <div className="uk-cover-container uk-height-medium container-height-bottom">
            <img
              className="uk-cover uk-img"
              data-src={urlFor(footer.footerBaner.image).width(2400).auto('format').url()}
              data-srcset={`${urlFor(footer.footerBaner.image).width(400).auto('format').url()} 400w,
                            ${urlFor(footer.footerBaner.image).width(640).auto('format').url()} 640w,
                            ${urlFor(footer.footerBaner.image).width(900).auto('format').url()} 900w,
                            ${urlFor(footer.footerBaner.image).width(1000).auto('format').url()} 1000w,
                            ${urlFor(footer.footerBaner.image).width(1900).auto('format').url()} 1900w,
                            ${urlFor(footer.footerBaner.image).width(2400).auto('format').url()} 2400w`}
              alt={footer.footerBaner.title}
              uk-cover=""
              uk-img="" />
          </div>
          <div className="uk-overlay-primary uk-position-cover"></div>
          <div className="uk-overlay uk-position-center uk-text-center uk-light">
            <h2 className="uk-margin-medium-bottom shadow_text">{footer.footerBaner.title}</h2>
            {!!linkAction && <Button link={linkAction} text={footer.footerBaner.textButton} type="negative" />}
          </div>
        </div>

        <div className="footer-content uk-background-muted uk-padding-large uk-padding-remove-horizontal uk-text-center uk-text-left@s">
          <div className="uk-container">
            <div className="uk-grid uk-child-width-1-1 uk-child-width-1-3@s uk-child-width-1-5@m">
              <div>
                <div className="contact-block">
                  <div className="icon-wrap">
                    <img src="/assets/phone-alt.svg" alt="phone" uk-svg=""/>
                  </div>
                  <a href={`tel:${footer.footerInfo.phone}`}>{footer.footerInfo.phone}</a>
                </div>
                <div><p>{footer.footerInfo.phoneDescription}</p></div>
              </div>
              <div>
                <div className="contact-block">
                  <div className="icon-wrap">
                    <img src="/assets/envelope.svg" alt="envelope" uk-svg=""/>
                  </div>
                  <a href={`mailto:${footer.footerInfo.email}`}>{footer.footerInfo.email}</a>
                </div>
                <div><p>{footer.footerInfo.emailDescription}</p></div>
              </div>
              <div>
                <h5>ADRESA</h5>
                <div><p>{footer.footerInfo.address}</p></div>
              </div>
              <div>
                <h5>ODKAZY</h5>
                <ul>
                  <li><a href="/clanek/obchodni-podminky">Obchodní podmínky</a></li>
                  <li><a href="/clanek/ochrana-osobnich-udaju">Ochrana osobních údajů</a></li>
                  <li><a onClick={(e) => handleCookies(e)} href="/">Nastavení cookies</a></li>
                </ul>
              </div>
              <div>
                <h5>SLEDUJTE NÁS</h5>
                <ul>
                  {footer.social?.facebook && <li><a href={footer.social?.facebook}>Facebook</a></li>}
                  {footer.social?.instagram && <li><a href={footer.social?.instagram}>Instagram</a></li>}
                  {footer.social?.youtube && <li><a href={footer.social?.youtube}>Youtube</a></li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="uk-container">
            <div className="uk-flex">
              <div className="logo uk-text-center uk-text-left@s">
                <img className="uk-img" data-src="/assets/negative-logo.svg" alt="Hurom" uk-img="" />
              </div>
              <div className="uk-text-center uk-text-left@s uk-width-1-1">
                <p>Fresh Juice s.r.o. výhradní distributor značky HUROM pro Českou Republiku</p>
              </div>
              <div className="copyright uk-text-center uk-text-right@s">
                <p>Web made in Brno by </p>
                <a href="mailto:daniel.kokes@gmail.com?subject=Poptavka z webu Hurom"><img className="uk-img" data-src="/assets/hardart.svg" alt="Hardart" uk-img="" /></a>
              </div>
            </div>
          </div>
        </div>

      </footer>
    )
  }else{
    return 'Loadding...'
  }

}

export default Footer
