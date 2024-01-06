import React from "react"
import AnimationView from "../features/common/AnimationView"
import ScrollToTop from "../features/common/ScrollToTop"
import Navbar from "../features/navbar/Navbar"
import Footer from "../features/common/Footer"
import HeroBack from "../features/common/HeroBack"
import Collections from "../features/merchandise/Collections"


const MerchandisePage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <HeroBack title={'Merchandise Collection'}></HeroBack>
      <Collections></Collections>
      <Footer></Footer>
    </AnimationView>
  )
}

export default MerchandisePage


