import React from "react"
import bg from "../../assets/bg-3.png"
import bg1 from "../../assets/bg-4.png"
import bg2 from "../../assets/bg-5.png"
import { Link, useNavigate } from "react-router-dom"

const Collection1 = () => {
  return (
    <div className={`w-full overflow-hidden`}>
      <div className="w-full bg-white dark:bg-[#0e0702] py-20 p-5">
        <div className="md:container md:mx-auto">
          <h2 className="uppercase text-5xl font-bold mb-20 tracking-widest text-black dark:text-white">
            MEMBERSHIPS
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-20 w-full">
            <div className="w-full md:w-1/3 h-[300px] md:h-full flex flex-col justify-center items-start relative">
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
            <div className="w-full md:w-2/3 flex flex-col justify-center items-start">
              <h6 className="uppercase font-black text-3xl text-black dark:text-white mb-8 tracking-wide leading-tight">
                COFFEE STAMPS
              </h6>
              <h6 className="uppercase font-black text-3xl text-black dark:text-white mb-8 tracking-wide leading-tight">
                FREE!
              </h6>
              <h6 className="font-light text-2xl text-black dark:text-white/50 mb-8">
                Welcome to "Coffee Stamps" by Coffee Unchained – where your coffee craze
                gets a mega boost! These stamps are like your golden tickets to an epic coffee
                universe. Get ready to level up and get access to the raddest digital coffee
                membership!
              </h6>
              {/* <h6 className="uppercase  text-2xl text-black dark:text-white mb-8 tracking-wide leading-tight">
                <span className="font-black">Benefits</span><br /><span className="font-thin">Coming soon</span>
              </h6> */}
              <Link
                to="/"
                className="uppercase bg-[#D02D2D] text-white text-sm md:text-lg tracking-wide py-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300"
              >
                GRAB MY STAMP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection1
