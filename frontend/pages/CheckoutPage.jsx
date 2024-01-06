import React, { useState } from 'react'
import AnimationView from '../features/common/AnimationView'
import ScrollToTop from '../features/common/ScrollToTop'
import Navbar from '../features/navbar/Navbar'
import HeroBack from '../features/common/HeroBack'
import Cart from '../features/cart/Cart'
import Footer from '../features/common/Footer'
import ShippingAddress from '../features/checkout/ShippingAddress'

const CheckoutPage = () => {

  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <HeroBack title={"Checkout"}></HeroBack>
      <ShippingAddress></ShippingAddress>
      <Footer></Footer>
    </AnimationView>
  )
}

export default CheckoutPage