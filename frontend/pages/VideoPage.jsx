import React from 'react'
import AnimationView from '../features/common/AnimationView'
import ScrollToTop from '../features/common/ScrollToTop'
import Navbar from '../features/navbar/Navbar'
import HeroVideo from '../features/course/HeroVideo'
import Course from '../features/course/Course'
import Nft from '../features/common/Nft'
import Footer from '../features/common/Footer'
import CourseRelatedVideos from '../features/course/CourseRelatedVideos'

const VideoPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
{/*       <Navbar></Navbar>
 */}      <HeroVideo></HeroVideo>
     <CourseRelatedVideos></CourseRelatedVideos>
      <Nft></Nft>
      <Footer></Footer>
    </AnimationView>
  )
}

export default VideoPage