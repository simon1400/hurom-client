export default `*[_type in ["article", "baseArticle"] && slug.current == $url]{
  title,
  image,
  "imageUrl": image.asset->url,
  content,
  chapters,
  meta,
  _type
}[0...1]`;
