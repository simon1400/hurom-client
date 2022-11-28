export default `*[_type == "homepage"]{
  title,
  image,
  "imageUrl": image.asset->url,
  content,
  textButton,
  "actionSlug": *[_type in ["product", "article", "recepts", "category"] && _id == ^.action._ref]{
    "slug": slug.current,
    _type
  }[0],
  baners,
  "banerLinks": *[_type in ["product", "article", "recepts"] && _id in ^.baners[].link._ref]{
    slug,
    _type,
    _id
  },
  products,
  "productsRef": *[_type == "product" && _id in [^.products.product_1._ref, ^.products.product_2._ref, ^.products.product_3._ref]]{
    _id,
    image,
    "slug": slug.current,
    label,
    label2,
    title,
    "gift": *[_type == 'gift' && _id == ^.gift._ref]{title, image},
    price,
    variants
  },
  meta
}[0...1]`
