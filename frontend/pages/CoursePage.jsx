import React from 'react'
import AnimationView from '../features/common/AnimationView'
import ScrollToTop from '../features/common/ScrollToTop'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'
import Nft from '../features/common/Nft'
import Hero from '../features/course/Hero'
import Course from '../features/course/Course'

const CoursePage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <Hero></Hero>
      <Course></Course>
      <Nft></Nft>
      <Footer></Footer>
    </AnimationView>
  )
}

export default CoursePage