import { useCanister } from '@connect2ic/react'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import VideoCard from './VideoCard'

const CourseRelatedVideos = () => {
  const [backend] = useCanister("backend")
  const [video, setVideo] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const param = useParams()


  useEffect(() => {
    const listVideo = async () => {
      try {
        setLoading(true)

        const items2 = await backend.listVideos()
        setVideos(items2)
        console.log(items2)
      } catch (error) {
        console.error("Error listing :", error)
      } finally {
        setLoading(false)
      }
    }

    listVideo()
  }, [backend])

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
    <div className="md:container md:mx-auto py-20 px-5">
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
        
            <div className="mb-16">
              <div className="flex justify-between items-center gap-5 mb-6">
                    <h1 className="text-2xl font-semibold tracking-wider uppercase text-black">
                      Continue Watching
                    </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {videos
                  .filter((item3) => item3[1].course === video.course)
                  .map((item2, index) => (
                    <VideoCard key={index} data={item2} />
                  ))}
              </div>
            </div>
      
      )}
    </div>
  )
}

export default CourseRelatedVideos