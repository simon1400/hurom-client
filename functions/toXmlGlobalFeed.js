const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <SHOP>\n`
  var paramStr, slide, galery, articles;
  const dataTransform = data.reduce((result, item) => {
    paramStr = ''
    slide = ''
    galery = ''
    articles = ''
    if(item.parametry && item.parametry.length){
      item.parametry.map(itemParameter => {
        var valueTypeParameters = item.params.filter(param => param._id === itemParameter.parameter._ref)[0].value
        paramStr += `\n<PARAM>
                      <PARAM_NAME>${item.params.filter(param => param._id === itemParameter.parameter._ref)[0].head}</PARAM_NAME>
                      <VAL>${itemParameter.value}${valueTypeParameters ? ' ' + valueTypeParameters : ''}</VAL>
                    </PARAM>\n`
      })
    }
    if(item.slider && item.slider.length){
      item.slider.map(itemSlider => {
        slide += `\n<IMGURL_ALTERNATIVE>${itemSlider}</IMGURL_ALTERNATIVE>\n`
      })
    }
    if(item.galeryAll && item.galeryAll.length){
      item.galeryAll.map(itemGalery => {
        galery += `\n<IMG>${itemGalery}</IMG>\n`
      })
    }
    if(item.articles && item.articles.length){
      item.articles.map(article => {
        articles += `\n<ITEM>\n
                        <ID>${article.id}</ID>
                        <TEXT>${article.text}</TEXT>
                        <LABEL>${article.label}</LABEL>
                        <IMG>${article.image}</IMG>
                        <TITLE>${article.title}</TITLE>
                        ${!!article.videoEmbedCode ? `<VIDEO_EMBEDED_CODE>${article.videoEmbedCode}</VIDEO_EMBEDED_CODE>` : ''}
                      \n</ITEM>\n`
      })
    }


   return result + `\n<SHOPITEM>
     <ITEM_ID>${item.id}</ITEM_ID>
     <PRODUCTNAME>HUROM | ${item.title}</PRODUCTNAME>
     <PRODUCT>HUROM | ${item.title}</PRODUCT>
     <DESCRIPTION>${item.description}</DESCRIPTION>
     <URL>${item.link}</URL>
     <IMGURL>${item.image_link}</IMGURL>
     ${slide}
     ${!!galery.length ? `<GALERY>${galery}</GALERY>` : ''}
     <VAT>21%</VAT>
     <TEXT>${item.globalText}</TEXT>
     <PRICE_VAT>${item.price}</PRICE_VAT>
     <ARTICLES>${articles}</ARTICLES>
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
