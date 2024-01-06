import React from "react";
import BG from "../../assets/bg-nft.png";
import { Link } from "react-router-dom";

const Nft = () => {
  return (
    <div
      className="your-component-class"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <h1 className="text-7xl md:text-5xl text-gray-200/20 dark:text-white/10 uppercase tracking-[10px] font-black absolute -top-1 -right-1 md:-right-[180px] md:top-[450px] rotate-0 md:-rotate-90 z-0 content-wrap">
        membership
      </h1>
      {/* //   <div className="w-full md:container md:mx-auto relative min-h-screen flex justify-center items-center overflow-hidden bg-cover bg-center bg-no-repeat my-5" style={{ backgroundImage: `url(${BG})`, backgroundSize: '70%', backgroundPosition: 'right center' }}>
  // <div className="flex items-center justify-center">
  //   <h1 className="text-7xl md:text-5xl text-gray-200/20 dark:text-white/10 uppercase tracking-[10px] font-black md:rotate-0 md:-rotate-90 z-0">
  //     membership
  //   </h1>
  // </div> */}

      {/* <div className="w-full h-full md:bg-black/60 dark:md:bg-black/70"> */}
      <div className="md:container md:mx-auto my-300px">
        <div className="w-full md:w-1/3 flex items-center py-20">
          <div className="bg-[#1C4516]/90 md:bg-[#1C4516] p-10 w-full flex flex-col justify-center items-center">
            <h1 className="text-white dark:text-white/80 text-3xl md:text-5xl mb-5 text-center">
              <span className="font-semibold ">CU</span>{" "}
              <span className="font-thin md:text-4xl lg:text-5xl">
                MEMBERSHIP
              </span>
            </h1>
            <h5 className="text-lg font-normal text-white dark:text-white/50 mb-6 text-center mb-5">
              Get ready to level up and get access to the raddest digital coffee
              membership! Imagine getting access to online coffee courses,
              killer discounts, and super cool merchandise – all from these
              awesome stamps. Dive in, join the fun, and let's caffeinate your
              world together!
            </h5>
            <Link
              to="/"
              className="cursor-pointer uppercase bg-white dark:bg-white/80 text-black tracking-wide px-2 py-1 font-semibold text-sm md:text-lg hover:bg-[#D02D2D] dark:hover:bg-[#D02D2D] hover:text-white transition-all ease-in-out duration-200 pointer-cursor"
            >
              BUY NOW!
            </Link>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Nft;
