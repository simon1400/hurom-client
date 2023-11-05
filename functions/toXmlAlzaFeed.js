const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <SHOP xmlns="http://www.zbozi.cz/ns/offer/1.0">\n`
  var paramStr;
  const dataTransform = data.reduce((result, item) => {
    paramStr = ''
    if(item.parametry && item.parametry.length){
      item.parametry.map(itemParameter => {
        let filter = item.params.filter(param => param._id === itemParameter.parameter._ref)[0]
        var valueTypeParameters = filter.value
        let head = filter.head
        let alzaName = filter.alzaName
        console.log(alzaName)
        paramStr += `\n<PARAM>
                      <PARAM_NAME>${alzaName ? alzaName : head}</PARAM_NAME>
                      <VAL>${itemParameter.value}${valueTypeParameters ? ' ' + valueTypeParameters : ''}</VAL>
                    </PARAM>\n`
      })
    }


   return result + `\n<SHOPITEM>
     <ITEM_ID>${item.id}</ITEM_ID>
     <PRODUCTNAME>HUROM | ${item.title}</PRODUCTNAME>
     <DESCRIPTION>${item.description}</DESCRIPTION>
     <URL>${item.link}</URL>
     <IMGURL>${item.image_link}</IMGURL>
     <PRICE>${(item.priceBeforeSale - (item.priceBeforeSale * 0.21)).toFixed(2)}</PRICE>
     <PRICE_VAT>${item.priceBeforeSale}</PRICE_VAT>
     <MANUFACTURER>HUROM</MANUFACTURER>
     <CATEGORY>18850379</CATEGORY>
     <EAN>${item.ean}</EAN>
     <SEO_Prefix>Odšťavňovač</SEO_Prefix>
     <STOCK>${item.stock}</STOCK>
     ${paramStr}
   </SHOPITEM>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</SHOP>`

  return xmlStringFeed
}

export default toXml;
