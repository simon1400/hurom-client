import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link'
import sanityClient from "../../lib/sanity.js";
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const Card = ({data}) => {

  return(
    <Link href={`/odstavnovac/${data.slug}`}>
      <a  className="card">
        {!!data?.gift?.length && <div className="gift-short" uk-tooltip="title: Dárek zdarma; pos: bottom">
          <img src="/assets/gift.svg" uk-svg="" />
        </div>}
        <div className="card-img-wrap">
          <div className="square">
            <img
              className="uk-img"
              uk-img=""
              data-src={urlFor(data.image).width(550).auto('format').url()}
              data-srcset={`${urlFor(data.image).width(400).auto('format').url()} 400w,
                            ${urlFor(data.image).width(550).auto('format').url()} 640w`}
              alt={data.title} />
          </div>
        </div>
        <div className="card-content-wrap">
          <h4>{data.title}</h4>
          {data.price > 0 && <span>{data?.price.toLocaleString()} Kč</span>}
        </div>
        {!!data.variants?.length && <div className="card-variants">
          <ul>
            {data.variants.map((item, index) => <li key={index} style={{backgroundColor: item.color ? item.color.hex : 'white'}} uk-tooltip={`title: ${item.title}; pos: bottom;`}></li>)}
          </ul>
        </div>}
      </a>
    </Link>
  )
}

export default Card
