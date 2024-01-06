import React from 'react'
import AnimationView from '../features/common/AnimationView'
import ScrollToTop from '../features/common/ScrollToTop'
import Navbar from '../features/navbar/Navbar'
import HeroBack from '../features/common/HeroBack'
import Footer from '../features/common/Footer'
import Dashboard from '../features/userDashboard/Dashboard'

const UserDashboard = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Navbar></Navbar>
      <HeroBack title={"MY Dashbaord"}></HeroBack>
      <Dashboard></Dashboard>
      <Footer></Footer>
    </AnimationView>
  )
}

export default UserDashboard