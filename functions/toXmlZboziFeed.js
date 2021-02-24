const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <SHOP xmlns="http://www.zbozi.cz/ns/offer/1.0">\n`
  var paramStr;
  const dataTransform = data.reduce((result, item) => {
    paramStr = ''
    if(item.parametry && item.parametry.length){
      item.parametry.map(itemParameter => {
        var valueTypeParameters = item.params.filter(param => param._id === itemParameter.parameter._ref)[0].value
        paramStr += `\n<PARAM>
                      <PARAM_NAME>${item.params.filter(param => param._id === itemParameter.parameter._ref)[0].head}</PARAM_NAME>
                      <VAL>${itemParameter.value}${valueTypeParameters ? ' ' + valueTypeParameters : ''}</VAL>
                    </PARAM>\n`
      })
    }


   return result + `\n<SHOPITEM>
     <ITEM_ID>${item.id}</ITEM_ID>
     <PRODUCTNAME>HUROM | ${item.title}</PRODUCTNAME>
     <PRODUCT>${item.title}</PRODUCT>
     <DESCRIPTION>${item.description}</DESCRIPTION>
     <URL>${item.link}</URL>
     <IMGURL>${item.image_link}</IMGURL>
     <PRICE_VAT>${item.price}</PRICE_VAT>
     ${paramStr}
     <MANUFACTURER>HUROM</MANUFACTURER>
     <BRAND>HUROM</BRAND>
     <DELIVERY_DATE>0</DELIVERY_DATE>
     <EAN>${item.ean}</EAN>
     <PRODUCTNO>${item.ean}</PRODUCTNO>
     <CATEGORYTEXT>Domácí spotřebiče | Kuchyňské spotřebiče | Příprava nápojů | Odšťavňovače</CATEGORYTEXT>
     ${item.gift.length ? '<FREE_GIFT_TEXT>'+item.gift[0].title+'</FREE_GIFT_TEXT>' : ''}
     ${item.gift.length ? '<EXTRA_MESSAGE>free_gift</EXTRA_MESSAGE>' : ''}
   </SHOPITEM>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</SHOP>`

  return xmlStringFeed
}

export default toXml;
