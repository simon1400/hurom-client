import Link from 'next/link'
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../lib/sanity.js";

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const Recept = ({data}) => {
  return(
    <Link href={`/recept/${data.slug}`}>
      <a className="card recept">
        <div className="card-img-wrap">
          {data.image && <img
            className="uk-img"
            data-src={urlFor(data.image).width(650).auto('format').url()}
            data-srcset={`${urlFor(data.image).width(400).auto('format').url()} 400w,
                          ${urlFor(data.image).width(640).auto('format').url()} 640w,
                          ${urlFor(data.image).width(900).auto('format').url()} 900w`}
            alt={data.title}
            uk-img="" />}
        </div>
        <div className="card-content-wrap">
          <h4>{data.title}</h4>
        </div>
      </a>
    </Link>
  )
}

export default Recept
