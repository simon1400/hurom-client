import {useState, useEffect} from 'react'
import loadable from '@loadable/component'
import sanityClient from "../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";

const Button = loadable(() => import('../Button'))

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const ArticleShort = ({reverse = false, inside = false, recept = false, data, links, shortLink = false}) => {

  const [link, setLink] = useState('')

  useEffect(() => {
    if(data.link){
      let currentLink = links.filter(item => item._id === data.link._ref)[0]

      if(currentLink._type === 'article'){
        setLink(`/clanek/${currentLink.slug.current}`)
      }else if(currentLink._type === 'recepts'){
        setLink(`/recept/${currentLink.slug.current}`)
      }else if(currentLink._type === 'product'){
        setLink(`/odstavnovac/${currentLink.slug.current}`)
      }
    }
  }, [])

  return (
    <div className={`article-short uk-margin-medium-bottom ${(inside || recept) ? "uk-margin-remove-bottom article-inside" : ''}`}>
      <div className={`uk-grid uk-child-width-1-1 ${data.image ? "uk-child-width-1-2@m" : ''} uk-grid-collapse ${reverse ? 'uk-flex-row-reverse' : ''}`} uk-grid="" uk-height-match="target: .height-eq">
        <div>
          <div className={`article-short-content uk-flex uk-flex-center@s uk-flex-column height-eq${!data.image ? 'height-auto' : undefined}`}>
            <div>
              {data?.description && <label className={`uk-label ${!data.title ? 'uk-margin-medium-bottom' : ''}`}>{data?.description}</label>}
              {data?.title && <h3 className="uk-margin-medium-bottom">{data?.title}</h3>}
              {!!data.content && <div className="uk-margin-bottom">
                <BlockContent blocks={data?.content} />
              </div>}
              {recept && data.ingredience && <label className="uk-label">ingredience</label>}
              {data.ingredience && <BlockContent blocks={data.ingredience} />}
              {(!!link.length || shortLink) && <div>
                <Button link={link || `/clanek/${data.slug}` } text="VÍCE INFORMACÍ" type="bare" />
              </div>}
            </div>
          </div>
        </div>
        <div>
          {!!data.image && !!data?.content && <div className="article-img-wrap">
            {!!data.video && <a className="video-icon" href={`#modal-media-${data._key}`} uk-toggle="">
              <img src="/assets/video.svg" alt="video" uk-svg="" />
            </a>}
            <img className="height-eq uk-img"
              data-src={urlFor(data.image).width(1000).height(1000).auto('format').url()}
              data-srcset={`${urlFor(data.image).width(400).height(400).auto('format').url()} 400w,
                        ${urlFor(data.image).width(640).height(640).auto('format').url()} 640w,
                        ${urlFor(data.image).width(900).height(900).auto('format').url()} 900w,
                        ${urlFor(data.image).width(1000).height(1000).auto('format').url()} 1000w`}
              alt={data.title}
              uk-img="" />
          </div>}
        </div>
      </div>
      {!!data.video && <div id={`modal-media-${data._key}`} className="uk-flex-top modal-video" uk-modal="">
        <div className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
          <button className="uk-modal-close-outside" type="button" uk-close=""></button>
          <iframe title={data.video} width="1980" height="1080" src={`https://www.youtube.com/embed/${data.video}`} uk-video="" uk-responsive="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
        </div>
      </div>}

    </div>
  )
}

export default ArticleShort
