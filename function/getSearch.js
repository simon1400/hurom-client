const getUrl = (url) => {
  var str = url.slice(1)
  str = str.split('&')
  var newStr = {}, itemSpliting
  str = str.map(item => {
    itemSpliting = item.split('=');
    newStr[itemSpliting[0]] = itemSpliting[1]
  })
  return newStr
}

export default getUrl
