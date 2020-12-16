const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>\n
  <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
  <title>Objevujte šnekové odšťavňovače Hurom</title>
  <link>https://hurom.cz</link>
  <description>Odšťavňujte pomocí nízkých otáček se šnekovými odšťavňovači Hurom a dodejte vašemu tělu jen ty nejlepší čerstvé přírodní šťávy prémiové kvality.</description>\n`

  const dataTransform = data.reduce((result, item) => {
   return result + `<item>
     <id>${item.id}</id>
     <title>${item.title}</title>
     <description>${item.description}</description>
     <link>${item.link}</link>
     <image_link>${item.image_link}</image_link>
     <availability>in stock</availability>
     <condition>new</condition>
     <price>${item.price} CZK</price>
     <brand>HUROM</brand>
     <inventory>10</inventory>
     <google_product_category>750</google_product_category>
   </item>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</channel>
                    </rss>`

  return xmlStringFeed
}

export default toXml;
