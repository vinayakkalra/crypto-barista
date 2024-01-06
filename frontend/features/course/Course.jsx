import React, { useEffect, useState } from "react"
import VideoCard from "./VideoCard"
import { useCanister } from "@connect2ic/react"
import { InfinitySpin } from "react-loader-spinner"

const Course = () => {
  const [backend] = useCanister("backend")
  const [course, setCourse] = useState([])
  const [video, setVideo] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAllVideos, setShowAllVideos] = useState({})
  const maxInitialDisplay = 4

  useEffect(() => {
    const listCourseAndVideo = async () => {
      try {
        setLoading(true)

        const items = await backend.listCourse()
        setCourse(items)
        console.log(items)

        const items2 = await backend.listVideos()
        setVideo(items2)
        console.log(items2)
      } catch (error) {
        console.error("Error listing :", error)
      } finally {
        setLoading(false)
      }
    }

    listCourseAndVideo()
  }, [backend])

  // console.log(course)
  // console.log(video)

  const handleToggleVideos = (courseTitle) => {
    setShowAllVideos((prevShowAllVideos) => ({
      ...prevShowAllVideos,
      [courseTitle]: !prevShowAllVideos[courseTitle],
    }))
  }

  return (
    <div className="md:container md:mx-auto py-20 px-5">
      {/*         <div className='mb-16'>
            <h1 className='text-2xl font-semibold tracking-wider uppercase'>New Added</h1>
            <div className='flex justify-between items-center gap-5 mb-6'>
                <h1 className='text-5xl font-semibold tracking-wider uppercase text-black'>COFFEE COURSES</h1>
                <button className='uppercase text-md font-medium tracking-widest text-white bg-[#D02F2F] px-6 py-2 hover:bg-black transition-all ease-in-out duration-300'>see all videos</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
            </div>
        </div> */}
      {loading ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <InfinitySpin
            width="200"
            color="black"
            ariaLabel="tail-spin-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
          {course.map((item, i) => (
            <div className="mb-16" key={i}>
              <div className="flex justify-between items-center gap-5 mb-6">
                <>
                  {video.filter((item3) => item3[1].course === item[1].title)
                    .length > 0 && (
                    <h1 className="text-5xl font-semibold tracking-wider uppercase text-black">
                      {item[1].title}
                    </h1>
                  )}
                </>
                {video.filter((item3) => item3[1].course === item[1].title)
                  .length > maxInitialDisplay && (
                  <button
                    className="uppercase text-md font-medium tracking-widest text-white bg-[#D02F2F] px-6 py-2 hover:bg-black transition-all ease-in-out duration-300"
                    onClick={() => handleToggleVideos(item[1].title)}
                  >
                    {showAllVideos[item[1].title]
                      ? "Hide Videos"
                      : "Show All Videos"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {video
                  .filter((item3) => item3[1].course === item[1].title)
                  .slice(
                    0,
                    showAllVideos[item[1].title]
                      ? undefined
                      : maxInitialDisplay,
                  )
                  .map((item2, index) => (
                    <VideoCard key={index} data={item2} />
                  ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Course
