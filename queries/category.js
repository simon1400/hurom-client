const settingCategoryProduct = `*[_type == "settingsProducts"]{
  title,
  image,
  "imageUrl": image.asset->url,
  content,
  meta
}[0]`;

const settingCategoryArticles = `*[_type == "settingsArticles"]{
  settingShortArticles,
  settingRecept
}[0]`;

const queryProducts = `*[_type == "product"]{
  _id,
  title,
  "slug": slug.current,
  price,
  priceBeforeSale,
  label,
  label2,
  "gift": *[_type == 'gift' && _id == ^.gift._ref]{title, image},
  "imageUrl": image.asset->url,
  "categorySlug": *[_type == "category-products" && _id == ^.categoryP._ref].slug.current[0],
  image,
  variants
} | order(pozition asc)[0...50]`;

const queryArticles = `*[_type == "article"]{
  title,
  "slug": slug.current,
  content,
  image,
  "imageUrl": image.asset->url
} | order(_createdAt desc)[0...50]`;

const queryRecepts = `*[_type == "recepts"]{
  title,
  "slug": slug.current,
  image
} | order(_createdAt desc)[0...50]`;


export {settingCategoryProduct, settingCategoryArticles, queryProducts, queryArticles, queryRecepts};
