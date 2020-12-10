export default `*[_type == "global"]{
  footerBaner,
  "actionSlug": *[_type in ["product", "article", "recepts", "category"] && _id == ^.footerBaner.action._ref]{
    "slug": slug.current,
    _type
  }[0],
  footerInfo,
  social
}`
