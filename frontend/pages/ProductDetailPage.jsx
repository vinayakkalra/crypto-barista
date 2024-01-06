import React from 'react'
import AnimationView from '../features/common/AnimationView'
import ScrollToTop from '../features/common/ScrollToTop'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'
import HeroBack from '../features/common/HeroBack'
import ProductDetails from '../features/merchandise/ProductDetails'

const ProductDetailPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <HeroBack title={'Merchandise Collection'}></HeroBack>
      <ProductDetails></ProductDetails>
      <Footer></Footer>
    </AnimationView>
  )
}

export default ProductDetailPage