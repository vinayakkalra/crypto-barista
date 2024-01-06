import React from 'react'
import bg from "../../assets/bgMerchandise.png"
import { HiOutlineArrowLongRight } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

const HeroBack = ({title}) => {
    const navigate = useNavigate();

  return (
    <div
    className="h-full w-full "
    style={{
      backgroundImage: `linear-gradient( rgba(184, 48, 0, 0.8)
, rgba(184, 48, 0, 0.8)), url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="flex" />
    <div className="h-96  dark:bg-[#0e0702] dark:bg-opacity-60 bg-orange-900 bg-opacity-60 ">
      <div className="md:container md:mx-auto h-full px-5 md:px-0">
        <div className="flex items-center justify-center h-full text-center">
            <button onClick={() => navigate(-1)}>
              <HiOutlineArrowLongRight
                className="border-[1.5px] border-white dark:border-white rounded-full w-[25px] md:w-[40px] h-[25px] md:h-[40px] flex justify-center items-center p-1 hover:rotate-180 transition-all duration-300 ease-in-out text-white dark:text-white hover:text-[#D02D2D] hover:border-[#D02D2D] dark:hover:text-[#D02D2D] dark:hover:border-[#D02D2D]"
                size={25}
              />
            </button>
          <h1 className="uppercase tracking-wider text-white text-center m-auto text-2xl pr-20  font-[600] md:text-4xl ">
            {" "}
            {title}{" "}
          </h1>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeroBack