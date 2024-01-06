import React from "react"
import Login from "../features/auth/components/Login"
import AnimationView from "../features/common/AnimationView"
import ScrollToTop from "../features/common/ScrollToTop"

const LoginPage = () => {
  return (
    <AnimationView>
      <ScrollToTop />
      <Login></Login>
    </AnimationView>
  )
}

export default LoginPage
