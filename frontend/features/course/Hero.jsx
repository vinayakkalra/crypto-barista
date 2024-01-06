import React, { useEffect, useState } from "react";
import BG from "../../assets/teaser1.png";
import { Link } from "react-router-dom";
import overlay from "../../assets/Rectangle 42.png";
import { FaPlayCircle } from "react-icons/fa";
import { useCanister } from "@connect2ic/react";
import THUMBNAIL from "../../assets/thumbnail.png";

const Hero = () => {
  const [backend] = useCanister("backend");
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listVideo = async () => {
      try {
        setLoading(true);

        const items2 = await backend.listVideos();
        setVideo(items2);
        console.log(items2);
      } catch (error) {
        console.error("Error listing :", error);
      } finally {
        setLoading(false);
      }
    };

    listVideo();
  }, [backend]);

  console.log(video);
  return (
    <>
      <div
        className={`w-full h-full md:h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden`}
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="w-full h-full bg-black/40 dark:bg-black/60 p-5 md:pt-16">
          <div className="md:container md:mx-auto h-full">
            <div className="flex flex-col lg:flex-row dark:bg-opacity-60 dark:bg-black items-center justify-center h-full py-20 gap-10">
              {/* First Column */}
              <div className="text-white text-left gap-10">
                <div className="mt-4 pl-2 border-l-2 border-white sm:pl-2 md:pl-0">
                  <h1 className="text-white text-md sm:text-2xl md:text-2xl font-bold tracking-wide pl-4 sm:pl-4">
                    Newly Added
                  </h1>
                  <div className="flex items-center pl-4 sm:pl-4">
                    <h1 className="text-white text-3xl sm:text-5xl md:text-5xl font-bold tracking-wide">
                      {video[0] && video[0][1]?.title}
                    </h1>
                    {/* <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-wide ml-4">
                      TITLE
                    </h1> */}
                  </div>
                  <p className="text-white text-left text-lg sm:text-xl md:text-2xl font-light tracking-wide pl-4 sm:pl-4 mt-4 sm:mt-8 mr-4 sm:mr-8">
                    {video[0] && video[0][1]?.description}
                  </p>
                  <div className="flex mt-8 pl-2">
                    <div className="md:flex-col">
                      <Link
                        to={`/video/${video[0] && video[0][1]?.slug}`}
                        className="bg-black tracking-wide text-xl sm:text-2xl text-white hover:text-black hover:bg-white px-8 py-2 mr-4 sm:mr-8"
                      >
                        Watch Now
                      </Link>
                      <Link
                        to={"/nft"}
                        className="bg-red-500 text-xl sm:text-2xl mt-2 tracking-wide text-white hover:text-black hover:bg-white px-8 py-2"
                      >
                        NOT A MEMBER?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Column */}
              <div className="relative mt-4 lg:mt-0">
                <img
                  className="mx-auto max-w-full h-auto lg:max-w-[700px]"
                  src={
                    video[0] && video[0][1]?.img1
                      ? video[0][1]?.img1
                      : THUMBNAIL
                  }
                  alt="Overlay"
                />
                <Link
                  to={`/video/${video[0] && video[0][1]?.slug}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <FaPlayCircle className="text-white text-6xl lg:text-8xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
