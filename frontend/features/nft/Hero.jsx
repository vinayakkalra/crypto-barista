import React from 'react'
import BG from "../../assets/nftherobg.png"
import bg from "../../assets/bg-3.png"
import bg1 from "../../assets/bg-4.png"
import bg2 from "../../assets/bg-5.png"
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLongRight } from 'react-icons/hi2'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`w-full md:h-screen bg-[url(${BG})] bg-cover bg-center bg-no-repeat relative overflow-hidden`}
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="w-full h-full bg-white/30 dark:bg-black/60 py-20 p-5">
          <div className="md:container md:mx-auto h-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-20 w-full h-full">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-start z-10">
                <button onClick={() => navigate(-1)} className='mb-20'>
                  <HiOutlineArrowLongRight
                    className="border-[1.5px] border-black dark:border-white rounded-full w-[25px] md:w-[40px] h-[25px] md:h-[40px] flex justify-center items-center p-1 hover:rotate-180 transition-all duration-300 ease-in-out text-black dark:text-white hover:text-[#D02D2D] hover:border-[#D02D2D] dark:hover:text-[#D02D2D] dark:hover:border-[#D02D2D]"
                    size={25}
                  />
                </button>
                <h6 className="uppercase font-bold text-3xl md:text-5xl text-white dark:text-white mb-8 leading-tight">
                  COFFEE UNCHAINED<br />
                  MEMBERSHIP

                </h6>
                <h6 className="font-light text-2xl text-white dark:text-white/50 mb-12">
                  ✓ Coffee Courses<br /> ✓ VIP Discounts on Coffee Products<br /> ✓ Access to Unique Merchandise <br />
                  Do you really want to miss out?

                </h6>
                <Link
                  to="/"
                  className="uppercase bg-[#D02D2D] text-white text-sm md:text-lg tracking-wide py-2 px-8 hover:bg-black hover:text-white transition-all ease-in-out duration-300"
                >
                  GET MY FREE MEMBERSHIP

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
    </>
  )
}

export default Hero