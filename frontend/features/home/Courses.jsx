import React, { useEffect, useState } from "react"
import IMG1 from "../../assets/video1.png"
import IMG2 from "../../assets/video2.png"
import IMG3 from "../../assets/video3.png"
import IMG4 from "../../assets/video4.png"
import IMG5 from "../../assets/video5.png"
import IMG6 from "../../assets/video6.png"
import IMG from "../../assets/image 1.png"
import THUMBNAIL from "../../assets/thumbnail.png"

import { HiPlayCircle } from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useCanister } from "@connect2ic/react"

const Courses = () => {

  const [backend] = useCanister("backend")
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        setLoading(true)

        const items = await backend.listVideos()
        setVideos(items)
        console.log(items)
      } catch (error) {
        console.error("Error listing :", error)
      } finally {
        setLoading(false)
      }
    }

    getAllVideos()
  }, [backend])

  return (
    <div className={`w-full relative overflow-hidden bg-white dark:bg-[#0e0702]`}>
      <h1 className="text-7xl md:text-8xl text-gray-200/40 dark:text-white/10 uppercase tracking-[10px] font-black absolute left-[5px] md:-left-[220px] top-[700px] rotate-0 md:-rotate-90 z-0">
        courses
      </h1>
      <div className="px-5 py-20">
        <div className="md:container md:mx-auto h-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full mb-6">
            <div className="w-full md:w-1/2">
              <h1 className="text-black dark:text-white text-6xl md:text-8xl uppercase tracking-wide">
                <span className="font-thin">ONLINE</span>
                <br />
                <span className="font-black">COFFEE</span>
                <br />
                <span className="font-medium">COURSES</span>
              </h1>
            </div>
            <div className="w-full md:w-1/2 h-full rounded-3xl relative">
              <Link
                to={`/video/${videos[0] && videos[0][1]?.slug}`}
                className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <HiPlayCircle size={100} className="text-white" />
              </Link>
              <div className="w-full h-full">
                <img
                  src={videos[0] && videos[0][1]?.img1 ? videos[0][1]?.img1 : THUMBNAIL}
                  alt="Course"
                  className="h-full w-full rounded-3xl"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-20">
            <h6 className="text-lg font-light text-black dark:text-white/50" style={{ fontSize: '1.125rem' }}>
              Are you ready to take your brewing skills to the next level? Let's uncover the secrets to your perfect cup of coffee!<br /> Jump into our interactive virtual workshops, where you'll become a master of crafting espresso, lattes, and more.
              <br /> Get set for an exciting and fun journey through the world of coffee-making. You'll have the opportunity to explore<br /> various bean varieties, brewing techniques, and the origins of your beloved roasts.

            </h6>
            <Link
              to={`/courses`}
              className="uppercase bg-[#D02D2D] dark:bg-[#D02D2D] text-white text-2xl tracking-wide py-2 px-8 hover:bg-black dark:hover:bg-black hover:text-white transition-all ease-in-out duration-300"
            >
              GET ACCESS
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Link
                to={`/video/${videos[1] && videos[1][1]?.slug}`}
                className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <HiPlayCircle size={70} className="text-white" />
              </Link>
              <div
                className="w-full h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${videos[1] && videos[1][1]?.img1 ? videos[1][1]?.img1 : THUMBNAIL})` }}
              />
            </div>
            <div className="relative">
              <Link
                to={`/video/${videos[2] && videos[2][1]?.slug}`}
                className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <HiPlayCircle size={70} className="text-white" />
              </Link>
              <div
                className="w-full h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${videos[2] && videos[2][1]?.img1 ? videos[3][1]?.img1 : THUMBNAIL})` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative w-full md:w-auto">
              <Link
                to={`/video/${videos[3] && videos[3][1]?.slug}`}
                className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <HiPlayCircle size={100} className="text-white" />
              </Link>
              <div
                className="w-full h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${videos[3] && videos[3][1]?.img1 ? videos[3][1]?.img1 : THUMBNAIL})` }}
              />
            </div>
            <div className="flex justify-center items-center w-full md:w-auto">
              <h1 className="text-4xl font-semibold text-black dark:text-white">#COFFEECOURSES</h1>
            </div>
            <div className="relative w-full md:w-auto">
              <Link
                to={`/video/${videos[4] && videos[4][1]?.slug}`}
                className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <HiPlayCircle size={100} className="text-white" />
              </Link>
              <div
                className="w-full h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${videos[4] && videos[4][1]?.img1 ? videos[4][1]?.img1 : THUMBNAIL})` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Link
                to={`/video/${videos[5] && videos[5][1]?.slug}`}
                className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <HiPlayCircle size={70} className="text-white" />
              </Link>
              <div
                className="w-full h-[350px] bg-cover bg-center"
                style={{ backgroundImage: `url(${videos[5] && videos[5][1]?.img1 ? videos[5][1]?.img1 : THUMBNAIL})` }}
              />
            </div>
            <div className="relative">
              <Link
                to={`/video/${videos[6] && videos[6][1]?.slug}`}
                className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <HiPlayCircle size={70} className="text-white" />
              </Link>
              <div
                className="w-full h-[350px] bg-cover bg-center"
                style={{ backgroundImage: `url(${videos[6] && videos[6][1]?.img1 ? videos[6][1]?.img1 : THUMBNAIL})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
