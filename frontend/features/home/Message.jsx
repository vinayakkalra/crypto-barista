import React from "react"
import BG1 from "../../assets/cover-1.png"
import BG2 from "../../assets/cover-2.png"
import { Link } from "react-router-dom"

const Message = () => {
  return (
    <div className="bg-white dark:bg-[#0e0702] py-10">
      <img src={BG1} alt="..." className="w-full" />
      <div className="-w-full bg-[#333333]">
        <div className="md:container md:mx-auto px-10 py-2 bg-[#333333]">
          <div className="flex justify-center items-center text-center w-full">
            <h1 className="font-bold text-3xl md:text-5xl uppercase text-white tracking-widest flex justify-center">
              <span className="max-w-screen-md">
                WE BELIEVE THAT COFFEE IS MORE THAN JUST A DRINK—IT'S A JOURNEY, A CULTURE, AND A COMMUNITY. DO YOU?
              </span>


            </h1>
          </div>
        </div>
      </div>
      {/* <Link
        to="/"
        className="uppercase bg-[#D02D2D] text-white text-sm md:text-lg tracking-wide py-2 px-8 hover:bg-black hover:text-white transition-all ease-in-out duration-300"
      >
        BECOME A MEMBER
      </Link>  */}
      <img src={BG2} alt="..." className="w-full" />
    </div>
  )
}

export default Message
