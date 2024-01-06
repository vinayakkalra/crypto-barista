import React from 'react'
import AnimationView from '../features/common/AnimationView'
import ScrollToTop from '../features/common/ScrollToTop'
import Navbar from '../features/navbar/Navbar'
import HeroBack from '../features/common/HeroBack'
import Footer from '../features/common/Footer'
import MyOrder from '../features/order/MyOrder'

const UserOrdersPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <HeroBack title={"MY orders"}></HeroBack>
      <MyOrder/>
      <Footer></Footer>
    </AnimationView>
  )
}

export default UserOrdersPage