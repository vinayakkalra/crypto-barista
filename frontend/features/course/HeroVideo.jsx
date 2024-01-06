import React, { useEffect, useState } from "react"
import bg from "../../assets/bgMerchandise.png"
import { HiOutlineArrowLongRight, HiPlay, HiPlayCircle } from "react-icons/hi2"
import { useNavigate, useParams } from "react-router-dom"
import THUMBNAIL from "../../assets/thumbnail.png"
import ReactHlsPlayer from "react-hls-player"
import { useCanister } from "@connect2ic/react"

const HeroVideo = () => {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  const [backend] = useCanister("backend")
  const [video, setVideo] = useState([])
  const [loading, setLoading] = useState(true)
  const param = useParams()

  useEffect(() => {
    const getVideo = async () => {
      try {
        setLoading(true)

        const item = await backend.getVideo(param.slug)
        setVideo(item.ok)
        console.log(item.ok)
      } catch (error) {
        console.error("Error listing :", error)
      } finally {
        setLoading(false)
      }
    }

    getVideo()
  }, [backend])

  return (
    <div className="relative">
      <button
        onClick={() => navigate(-1)}
        className="z-20 absolute top-10 left-10"
        style={{ zIndex: 20 }} // Add this style to ensure z-index is applied
      >
        <HiOutlineArrowLongRight
          className="border-[1.5px] border-white dark:border-white rounded-full w-[25px] md:w-[40px] h-[25px] md:h-[40px] flex justify-center items-center p-1 hover:rotate-180 transition-all duration-300 ease-in-out text-white dark:text-white hover:text-[#D02D2D] hover:border-[#D02D2D] dark:hover:text-[#D02D2D] dark:hover:border-[#D02D2D]"
          size={25}
        />
      </button>
      {isPlaying ? (
        <ReactHlsPlayer
          src={video?.video_url}
          autoPlay={true}
          controls={true}
          width="100%"
          height="auto"
          className="z-10"
        />
      ) : (
        <div
          className=" h-screen w-full"
          style={{
            backgroundImage: `url(${video?.img1 ? video?.img1 : THUMBNAIL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 w-full h-full">
            <div className="md:container md:mx-auto h-full px-5">
              <div className="flex flex-col justify-center items-start h-full w-full md:w-2/3">
                <h1 className="text-white text-2xl font-semibold capitalize">
                  {video?.course}
                </h1>
                <h1 className="text-white text-5xl font-semibold capitalize mb-3">
                  {video?.title}
                </h1>
                <p className="text-white text-md font-light mb-6">
                  {video?.description}
                </p>
                <div className="flex">
                  <button
                    onClick={handlePlayClick}
                    className="text-white uppercase font-semibold tracking-wider flex justify-center items-center gap-2 text-xl"
                  >
                    <HiPlayCircle className="w-20 h-20" /> Start Watching
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroVideo
