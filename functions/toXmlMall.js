const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <ITEMS>\n`
  var paramStr, slide, articles;
  const dataTransform = data.reduce((result, item) => {
    paramStr = ''
    slide = ''
    articles = ''
    console.log(item.params);
    if(item.parametry && item.parametry.length){
      item.parametry.map(itemParameter => {
        paramStr += !!item.params.filter(param => param._id === itemParameter.parameter._ref)[0].mallName ? `\n<PARAM>
                      <NAME>${item.params.filter(param => param._id === itemParameter.parameter._ref)[0].mallName}</NAME>
                      <VALUE>${itemParameter.value}</VALUE>
                    </PARAM>\n` : ''
      })
    }

    if(item.slider && item.slider.length){
      item.slider.map(itemSlider => {
        slide += `\n<MEDIA>
                      <URL>${itemSlider+'?w=500'}</URL>
                      <MAIN>false</MAIN>
                    </MEDIA>\n`
      })
    }

    if(item.articles && item.articles.length){
      item.articles.map(article => {
        articles += `\n&lt;div&gt; \n
                        &lt;h2&gt; ${article.title}&lt;/h2&gt; \n
                        &lt;img src="${article.image+'?w=500'}" /&gt; \n
                        &lt;p&gt; ${article.text}&lt;/p&gt; \n
                      \n&lt;/div&gt; \n`
      })
    }


   return result + `\n<ITEM>
     <ID>${item.id}</ID>
     <STAGE>draft</STAGE>
     ${!!item.parentId ? `<ITEMGROUP_ID>${item.parentId}</ITEMGROUP_ID>` : ''}
     ${!!item.parentTitle ? `<ITEMGROUP_TITLE>${item.parentTitle}</ITEMGROUP_TITLE>` : ''}
     <CATEGORY_ID>EB034</CATEGORY_ID>
     <BRAND_ID>HUROM</BRAND_ID>
     <TITLE>${item.title}</TITLE>
     <SHORTDESC>${item.globalText}</SHORTDESC>
     <LONGDESC>${articles}</LONGDESC>
     <PRIORITY>1</PRIORITY>
     <PACKAGE_SIZE>smallbox</PACKAGE_SIZE>
     <BARCODE>${item.ean}</BARCODE>
     <PRICE>${item.price}</PRICE>
     <VAT>21</VAT>
     <RRP>${item.price}</RRP>
     ${paramStr}
     <MEDIA>
      <URL>${item.image_link+'?w=500'}</URL>
      <MAIN>true</MAIN>
     </MEDIA>
     ${slide}
     <DELIVERY_DELAY>0</DELIVERY_DELAY>
   </ITEM>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</ITEMS>`

  return xmlStringFeed
}

export default toXml;
