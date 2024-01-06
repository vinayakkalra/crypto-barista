import React from "react"
import AnimationView from "../features/common/AnimationView"
import ScrollToTop from "../features/common/ScrollToTop"
import Navbar from "../features/navbar/Navbar"
import HeroBack from "../features/common/HeroBack"
import Footer from "../features/common/Footer"
import Cart from "../features/cart/Cart"

const CartPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <HeroBack title={"MY CART"}></HeroBack>
      <Cart></Cart>
      <Footer></Footer>
    </AnimationView>
  )
}

export default CartPage
