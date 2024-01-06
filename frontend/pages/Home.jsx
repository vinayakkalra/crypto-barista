import React from "react"
import Navbar from "../features/navbar/Navbar"
import Footer from "../features/common/Footer"
import Hero from "../features/home/Hero"
import About from "../features/home/About"
import Courses from "../features/home/Courses"
import Explore from "../features/home/Explore"
import Message from "../features/home/Message"
import Merchandise from "../features/home/Merchandise"
import Nft from "../features/common/Nft"
import Contact from "../features/common/Contact"
import ScrollToTop from "../features/common/ScrollToTop"
import AnimationView from "../features/common/AnimationView"

const Home = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <Hero></Hero>
      <About></About>
      <Courses></Courses>
      <Explore></Explore>
      <Message></Message>
      <Merchandise></Merchandise>
      <Nft></Nft>
      <Contact></Contact>
      <Footer></Footer>
    </AnimationView>
  )
}

export default Home
