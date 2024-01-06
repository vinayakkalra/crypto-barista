import React from 'react'
import AnimationView from '../features/common/AnimationView'
import ScrollToTop from '../features/common/ScrollToTop'
import Navbar from '../features/navbar/Navbar'
import HeroBack from '../features/common/HeroBack'
import Footer from '../features/common/Footer'
import WishlistItem from '../features/wishlist/WishlistItem'

const WishlistPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <HeroBack title={"MY Favourites"}></HeroBack>
      <WishlistItem></WishlistItem>
      <Footer></Footer>
    </AnimationView>
  )
}

export default WishlistPage