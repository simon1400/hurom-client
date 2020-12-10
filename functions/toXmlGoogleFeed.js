const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>\n
  <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
  <title>Objevujte šnekové odšťavňovače Hurom</title>
  <link>https://hurom.cz</link>
  <description>Odšťavňujte pomocí nízkých otáček se šnekovými odšťavňovači Hurom a dodejte vašemu tělu jen ty nejlepší čerstvé přírodní šťávy prémiové kvality.</description>\n`

  const dataTransform = data.reduce((result, item) => {
   return result + `<item>
     <g:id>${item.id}</g:id>
     <title>${item.title}</title>
     <description>${item.description}</description>
     <link>${item.link}</link>
     <g:image_link>${item.image_link}</g:image_link>
     <g:availability>in stock</g:availability>
     <g:price>${item.price}</g:price>
     <g:mpn>${item.mpn}</g:mpn>
     ${item.ean ? '<g:gtin>'+item.ean+'</g:gtin>' : ''}
     <g:brand>HUROM</g:brand>
   </item>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</channel>
  </rss>`

  return xmlStringFeed
}

export default toXml;
