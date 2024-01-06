import React from "react"
import BG from "../../assets/coffeebeans.png"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <>
      <div
        className={`w-full bg-[url(${BG})] bg-cover bg-center bg-no-repeat relative overflow-hidden`}
        style={{ backgroundImage: `url(${BG})` }}
      >
        {/* <h1 className="text-4xl md:text-6xl text-gray-200/50 dark:text-white/20 uppercase tracking-[10px] font-black absolute -top-2.5 md:-top-5 -right-2 ">
          WHERE COFFEE BECOMES
        </h1> */}
        <div className="w-full h-full bg-black/40 dark:bg-black/60 p-5 py-20 md:py-28">
          <div className="md:container md:mx-auto h-full flex justify-center items-center">
            <div className="w-full md:w-2/3 bg-white dark:bg-[#0e0702] p-7 pt-20 relative" >
              <div className="flex-col items-center justify-center text-center">
                <h4 className="font-bold text-black dark:text-white/50 text-4xl uppercase mb-8" >
                  <h3 style={{ fontSize: '1.3rem', lineHeight: '1.75rem'}} >WHERE COFFEE BECOMES <br /></h3>
                  YOUR EXCLUSIVE EXPERIENCE
                </h4>
                <p className="text-xl text-black dark:text-white/50 font-light mb-8 " style={{ fontSize: '1.125rem' }}>
                  Welcome to "Coffee Unchained" by Coffee Culture Thailand! Are you ready to dive into the world of coffee like never before? With Coffee Unchained, your coffee journey just got a lot more exciting. Discover your perks:<br /><br />

                  ✓ Coffee Courses<br />
                  ✓ VIP Discounts on Coffee Products<br />
                  ✓ Access to Unique Merchandise

                </p>
                <div className="static md:absolute md:-bottom-6 md:left-1/2 md:transform md:-translate-x-1/2">
                  <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                    <Link
                      to="/"
                      className="uppercase bg-[#000000] text-white text-xl tracking-wide py-2 px-8 hover:bg-[#D02D2D] hover:text-white transition-all ease-in-out duration-300"
                    >
                      MORE INFO
                    </Link>
                    <Link
                      to="/"
                      className="uppercase bg-[#D02D2D] text-white text-xl tracking-wide py-2 px-8 hover:bg-black hover:text-white transition-all ease-in-out duration-300 "
                    >
                      SIGN ME UP!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
