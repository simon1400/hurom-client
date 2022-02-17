import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import {AxiosAPI} from '../../restClient'
import validationForm from '../../function/validationForm'
import router from 'next/router'
import Page from '../../layout/page'

import Checkout from '../../view/Checkout'

const CheckoutWrap = () => {

  const [basketItems, setBasketItems] = useState([])
  const { dataContextState } = useContext(DataStateContext)
  const [startSum, setStartSum] = useState(0)
  const [sum, setSum] = useState(0)
  const [sale, setSale] = useState({value: 0, typ: ''})
  const [deliveryMethod, setDeliveryMethod] = useState([
    {
      name: 'delivery',
      label: 'Česká pošta, balík do ruky',
      value: '130',
      check: false
    },
    {
      name: 'delivery',
      label: 'Rozvoz po Brně',
      value: '90',
      check: false
    },
    {
      name: 'delivery',
      label: 'Osobní odběr, Nádražní 326, Brno',
      value: '0',
      check: false
    }
  ])
  const [payMethod, setPayMethod] = useState([
    {
      name: 'payment',
      label: 'Platební kartou online',
      value: '0',
      check: false,
      disabled: false,
      payOnline: true,
      method: 'CARD_CZ_CSOB_2'
    },
    {
      name: 'payment',
      label: 'Bankovním převodem na účet',
      value: '0',
      check: false,
      disabled: false,
      payOnline: true,
      method: 'BANK_ALL'
    },
    {
      name: 'payment',
      label: 'Na dobírkou při převzetí zásilky',
      value: '30',
      check: false,
      disabled: false
    },
    {
      name: 'payment',
      label: 'V hotovosti na pobočce',
      value: '0',
      check: false,
      disabled: false
    }
  ])

  const [contactInfo, setContactInfo] = useState({
    email: dataContextState.user?.contactInfo?.email || '',
    phone: dataContextState.user?.contactInfo?.phone || '',
    name: dataContextState.user?.contactInfo?.name || '',
    surname: dataContextState.user?.contactInfo?.surname || '',
    address: dataContextState.user?.contactInfo?.address || '',
    city: dataContextState.user?.contactInfo?.city || '',
    zip: dataContextState.user?.contactInfo?.zip || '',
    state: dataContextState.user?.contactInfo?.state || 'Česko',
  })

  const [anotherAddress, setAnotherAddress] = useState({
    email: dataContextState.user?.anotherAddress?.email || '',
    phone: dataContextState.user?.anotherAddress?.phone || '',
    name: dataContextState.user?.anotherAddress?.name || '',
    surname: dataContextState.user?.anotherAddress?.surname || '',
    address: dataContextState.user?.anotherAddress?.address || '',
    city: dataContextState.user?.anotherAddress?.city || '',
    zip: dataContextState.user?.anotherAddress?.zip || '',
    state: dataContextState.user?.anotherAddress?.state || 'Česko',
  })

  const [firmInfo, setFirmInfo] = useState({
    nameCompany: dataContextState.user?.firmInfo?.nameCompany || '',
    ico: dataContextState.user?.firmInfo?.ico || '',
    dic: dataContextState.user?.firmInfo?.dic || ''
  })

  // const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')

  const [state, setState] = useState({
    deliveryAnother: false,
    firmInfo: false,
    createAccount: false,
    description: false,
    sale: false
  })

  const [error, setError] = useState({
    deliveryMethod: false,
    payMethod: false,
    email: false,
    phone: false,
    name: false,
    surname: false,
    address: false,
    city: false,
    zip: false,
    state: false,
    password: false,
    description: false,
    nameCompany: false,
    ico: false,
    dic: false,
    exist: false,
    fields: false,
    sale: false
  })

  const handleStratSum = () => {
    var newStartSum = 0
    dataContextState.basket.map(item => {
      newStartSum += +item.price * +item.count
    })
    if(newStartSum > 2000){
      var newDeliveryMethod = [...deliveryMethod]
      var newPayMethod = [...payMethod]
      newDeliveryMethod.map(item => item.value = 0)
      newPayMethod.map(item => item.value = 0)
    }
    setStartSum(newStartSum)
    return newStartSum
  }

  useEffect(() => {
    setBasketItems(dataContextState.basket)
    if(!dataContextState.basket.length) {
      router.push('/')
    }
    handleStratSum()
  }, [])


  useEffect(() => {
    if(sale.value){
      var newSum = sum
      if(sale.typ === 'procent'){
        newSum = Math.round(newSum - (newSum * (sale.value / 100)))
      }else if(sale.typ === 'current'){
        newSum = newSum - sale.value
      }
      setSum(newSum)
    }

  }, [sale.value])

  useEffect(() => {
    setError({...error, deliveryMethod: false})
    var newPay = [...payMethod]
    if(deliveryMethod[0].check || deliveryMethod[1].check){
      newPay[3].disabled = true
      newPay[3].check = false
    }else{
      newPay[3].disabled = false
    }
    if(deliveryMethod[2].check){
      newPay[2].disabled = true
      newPay[2].check = false
    }else{
      newPay[2].disabled = false
    }
    setPayMethod(newPay)
  }, [deliveryMethod])

  useEffect(() => {
    setError({...error, payMethod: false})
  }, [payMethod])

  const sumWithOptions = () => {
    const checkDelivery = deliveryMethod.filter(item => item.check)[0]
    const checkPayment = payMethod.filter(item => item.check)[0]
    var sum = startSum
    sum += +checkDelivery?.value || 0
    sum += +checkPayment?.value || 0
    return sum
  }

  useEffect(() => {
    setSum(handleStratSum())
    sumWithOptions()
  }, [dataContextState.basket])

  useEffect(() => {
    setSum(sumWithOptions(startSum))
  }, [deliveryMethod, payMethod])

  const onBlur = (type) => {
    if(validationForm(type, contactInfo, error, setError)) {
      return true
    }
    return false
  }

  const send = async () => {

    const newError = {...error}

    if(!contactInfo.address.length) newError.address = true
    if(!contactInfo.city.length) newError.city = true
    if(!contactInfo.surname.length) newError.surname = true
    if(!contactInfo.name.length) newError.name = true
    if(!contactInfo.phone.length) newError.phone = true
    if(!contactInfo.zip.length) newError.zip = true

    if(onBlur('email')) newError.email = true

    const checkDelivery = await deliveryMethod.filter(item => item.check)[0]
    const checkPayment = await payMethod.filter(item => item.check)[0]

    if(!checkDelivery) newError.deliveryMethod = true
    if(!checkPayment) newError.payMethod = true

    setError({...error, ...newError})

    if(Object.values(newError).indexOf(true) >= 0){
      return
    }

    if(!basketItems.length){
      window.location.href = '/'
      return
    }


    const dataSend = {
      email: contactInfo.email,
      delivery: {
        name: checkDelivery.label,
        value: checkDelivery.value
      },
      payment: {
        name: checkPayment.label,
        value: checkPayment.value,
        method: checkPayment.method
      },
      contactInfo,
      anotherAddress,
      status: 'PENDING',
      payOnline: checkPayment.payOnline,
      sale,
      firmInfo,
      check: {...state},
      description,
      basket: basketItems,
      sum: sum
    }

    await AxiosAPI.post(`/order`, dataSend).then(res => {
      if(dataSend.payOnline && res.data.data.redirect !== undefined){
        window.location.href = decodeURIComponent(res.data.data.redirect)
      }else{
        window.location.href = `/thank-you?refId=${res.data.data.idOrder}&dobirka=true`
      }
    })
  }

  return (
    <Checkout
      sum={sum}
      sale={sale}
      send={send}
      state={state}
      error={error}
      setSale={setSale}
      setError={setError}
      firmInfo={firmInfo}
      startSum={startSum}
      setState={setState}
      payMethod={payMethod}
      basketItems={basketItems}
      contactInfo={contactInfo}
      setFirmInfo={setFirmInfo}
      description={description}
      setPayMethod={setPayMethod}
      anotherAddress={anotherAddress}
      setContactInfo={setContactInfo}
      setDescription={setDescription}
      deliveryMethod={deliveryMethod}
      setDeliveryMethod={setDeliveryMethod}
      setAnotherAddress={setAnotherAddress}
    />
  )
}

export default CheckoutWrap
