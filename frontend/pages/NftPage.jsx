import React from "react"
import Navbar from "../features/navbar/Navbar"
import Hero from "../features/nft/Hero"
import Collection1 from "../features/nft/Collection1"
import Collection2 from "../features/nft/Collection2"
import Collection3 from "../features/nft/Collection3"
import Nft from "../features/common/Nft"
import Contact from "../features/common/Contact"
import Footer from "../features/common/Footer"
import ScrollToTop from "../features/common/ScrollToTop"
import AnimationView from "../features/common/AnimationView"

const NftPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <Hero></Hero>
      <Collection1></Collection1>
      <Collection2></Collection2>
      <Collection3></Collection3>
      <Nft></Nft>
      <Contact></Contact>
      <Footer></Footer>
    </AnimationView>
  )
}

export default NftPage
