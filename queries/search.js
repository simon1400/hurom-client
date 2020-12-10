export default `*[_type in ["article", "product"] && (title match $value || slug.current match $value || description match $value || content[].children[].text match $value)]{
  _type,
  title,
  content,
  image,
  price,
  description,
  "slug": slug.current,
  "categorySlug": *[_type == "category-products" && _id == ^.categoryP._ref].slug.current[0],
  "categorySlug": *[_type == "categoryArticles" && _id == ^.category._ref].slug.current[0],
} | order(_type desc)`
