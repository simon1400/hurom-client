const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <SHOP>\n`
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
     <PRODUCT>HUROM | ${item.title}</PRODUCT>
     <DESCRIPTION>${item.description}</DESCRIPTION>
     <URL>${item.link}</URL>
     <IMGURL>${item.image_link}</IMGURL>
     <PRICE_VAT>${item.price}</PRICE_VAT>
     ${paramStr}
     <MANUFACTURER>HUROM</MANUFACTURER>
     <DELIVERY_DATE>0</DELIVERY_DATE>
     <EAN>${item.ean}</EAN>
     <CATEGORYTEXT>Odšťavňovače</CATEGORYTEXT>
     <CATEGORY>
        <CATEGORY_ID>954</CATEGORY_ID>
        <CATEGORY_NAME>Odšťavňovače</CATEGORY_NAME>
        <CATEGORY_FULLNAME>Hurom.cz | Bílé zboží | Malé spotřebiče | Kuchyňské spotřebiče | Odšťavňovače</CATEGORY_FULLNAME>
     </CATEGORY>
     ${item.gift.length ? '<GIFT>'+item.gift[0].title+'</GIFT>' : ''}
   </SHOPITEM>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</SHOP>`

  return xmlStringFeed
}

export default toXml;
