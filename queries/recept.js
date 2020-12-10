export default `*[_type == "recepts" && slug.current == $url]{
  title,
  image,
  "imageUrl": image.asset->url,
  content,
  ingredience,
  procedure,
  aditionalImage,
  meta
}[0...1]`
