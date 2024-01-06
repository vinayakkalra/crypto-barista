import React from 'react';
import BG from '../../assets/bghero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <div
        className={`w-full h-[500px] md:h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden`}
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="w-full h-full bg-black/40 dark:bg-black/60 p-5 md:pt-16">
          <div className="md:container md:mx-auto h-full">
            <div className="flex justify-start items-center h-full">
              <div>
                <h1 className="text-2xl md:text-5xl lg:text-6xl text-white dark:text-white uppercase font-bold mb-4 md:mb-8">
                  WELCOME TO YOUR
                  <br />
                  EXCLUSIVE COFFEE HUB
                </h1>
                <h6 className="text-base md:text-2xl text-white dark:text-white font-light mb-4 md:mb-8">
                  Your Exclusive Gateway to the World of Coffee!<br />
                  We're brewing up a special coffee club just for you,<br />
                  Offering a world of coffee experiences. Scroll down for more!
                  {' '}
                </h6>
                <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                  <Link
                    to="/"
                    className="uppercase bg-black text-white text-sm md:text-lg tracking-wide py-2 px-2 md:py-2 md:px-4 hover:bg-[#D02D2D] hover:text-white transition-all ease-in-out duration-300 mb-2 md:mb-0"
                  >
                    TELL ME MORE
                  </Link>
                  <Link
                    to="/"
                    className="uppercase bg-[#D02D2D] text-white text-sm md:text-lg tracking-wide py-2 px-2 md:py-2 md:px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 mb-2 md:mb-0"
                  >
                    JOIN THE CLUB
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[80px] bg-black text-white text-sm md:text-4xl flex justify-center items-center overflow-hidden">
        <h1 className="animate-marquee whitespace-nowrap uppercase tracking-widest">
          Coffee course exclusive discounts merchandise stores
        </h1>
      </div>
    </>
  );
};

export default Hero;
