export default `*[_type in ["product", 'accessories'] && slug.current == $url]{
  _id,
  title,
  slug,
  image,
  variants,
  benefits,
  price,
  "gift": *[_type == 'gift' && _id == ^.gift._ref]{title, image},
  descriptions,
  content,
  slider,
  parametry,
  "param": *[_type == 'param' && _id in ^.parametry[].parameter._ref]{
    head,
    value,
    _id
  },
  galery,
  "accessories": *[_type == 'accessories' && _id in ^.accessories[]._ref]{title, image, "slug": slug.current, price},
  meta
}[0...1]`
