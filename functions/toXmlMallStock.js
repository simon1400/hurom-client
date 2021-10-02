const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <AVAILABILITIES>\n`
  const dataTransform = data.reduce((result, item) => {

   return result + `\n<AVAILABILITY>
     <ID>${item.id}</ID>
     <IN_STOCK>${item.stock}</IN_STOCK>
     <ACTIVE>true</ACTIVE>
   </AVAILABILITY>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</AVAILABILITIES>`

  return xmlStringFeed
}

export default toXml;
