import React from "react"
import bg from "../../assets/bg-3.png"
import bg1 from "../../assets/bg-4.png"
import bg2 from "../../assets/bg-5.png"
import { Link } from "react-router-dom"

const Explore = () => {
  return (

    <div className={`w-full min-h-screen relative overflow-hidden  bg-white dark:bg-[#0e0702]`}>
      <h1 className="text-7xl text-gray-200/40 dark:text-white/10 uppercase tracking-[10px] font-black absolute -top-3 -right-1  md:-right-[115px] md:top-[270px] rotate-0 md:-rotate-90 z-0">
        membership
      </h1>
      <div className="px-5 py-24 md:py-32">
        <div className="md:container md:mx-auto h-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-20 w-full">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
              <h6 className="uppercase font-light text-2xl text-black dark:text-white/50 mb-0 leading-tight">
                WHEN YOU JOIN US
              </h6>
              <h6 className="uppercase font-bold text-6xl md:text-8xl text-black dark:text-white mb-3">
                
                <span className="font-normal" style={{fontSize: "1.9rem"}} >IT'S NOT JUST ABOUT</span>
                <br />
                <span className="font-black">COFFEE</span>
                <br />
                <span className="font-light">COURSES</span>
              </h6>
              <h6 className="font-light text-lg text-black dark:text-white/50 mb-6">
                You'll also get to sip & save with VIP discounts on a variety of coffee products. Enjoy exclusive accesss to unique merchandises.
                That's not all – coffee connects people. It's all here waiting for you. So, do you really want to miss out on all the fun and fantastic coffee experiences?  <br /> Join us today and become a part of this exclusive coffee experience!
              </h6>
              <Link
                to="/"
                className="uppercase bg-[#D02D2D] text-white text-sm md:text-lg tracking-wide py-2 px-8 hover:bg-black hover:text-white transition-all ease-in-out duration-300"
              >
                BECOME A MEMBER
              </Link>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-full flex flex-col justify-center items-start relative">
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <img
                  src={bg}
                  className="h-[250px] md:h-[300px] absolute rotate-[-15deg] z-[3]"
                  alt="Image 1"
                />
                <img
                  src={bg1}
                  className="h-[250px] md:h-[300px] absolute rotate-[30deg] z-[2]"
                  alt="Image 2"
                />
                <img
                  src={bg2}
                  className="h-[250px] md:h-[300px] absolute rotate-[5deg] z-[1]"
                  alt="Image 3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Explore
