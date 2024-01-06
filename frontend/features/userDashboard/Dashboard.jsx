import React from "react"
import bg from "../../assets/bgac.png"
import Sidebar from "./Sidebar"

const Dashboard = () => {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `linear-gradient( rgba(256, 256, 256, 0.6)
, rgba(256, 256, 256, 0.6)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="md:container md:mx-auto px-5 py-20">
        <div className="flex flex-col md:flex-row justify-start items-start gap-10">
          <Sidebar />
          <div className="w-full md:w-4/5">
          <div className=" bg-black/70 backdrop-blur-sm p-6 mb-6">
            <div className="px-2 py-2 text-center flex md:text-auto">
              <h1 className="font-[900] md:text-[32px] text-xl px-2 text-white">LATEST</h1>
              <h1 className="md:text-[32px] text-xl font-[300] text-white mb-4">
                ANNOUNCEMENT
              </h1>
            </div>
            <div className="w-full px-4">
              <p className="text-white tracking-wide text-lg font-light mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged.
              </p>
              <div>
                <button className="bg-white px-4 py-1 text-black my-2 tracking-widest text-lg">
                  EXPLORE
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white backdrop-blur-sm p-6">
            <div className="px-0 py-2 text-center flex md:text-auto">
              <h1 className="font-[900] text-[32px] px-0">SPECIAL</h1>
              <h1 className="text-[32px] font-[300]">OFFERS</h1>
            </div>
            <div className="w-full px-4 tracking-wide text-lg font-light ">
              <div>
                <ul class="list-disc">
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five
                  </li>
                  <li>
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the
                  </li>
                  <li>
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the
                  </li>
                </ul>
              </div>
            </div>
          </div> 
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard
