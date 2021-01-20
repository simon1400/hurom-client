const gtag = data => {

  const tax = data.sum * 0.21
  const sumWithoutTax = data.sum - tax

  const dataSend = {
    transaction_id: data.idOrder,
    affiliation: "Hurom",
    value: sumWithoutTax,
    currency: 'CZK',
    tax: tax,
    shipping: data.deliveryPrice,
    items: data.basket.map((item, index) => ({
      id: item.id,
      name: item.nameProduct,
      brand: "Hurom",
      variant: item.variantProduct,
      list_position: index + 1,
      quantity: item.count,
      price: item.price
    }))
  }

  return dataSend
}


export default gtag
