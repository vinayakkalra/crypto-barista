import React, { useState } from "react"
import { HiArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2"
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialTwitter,
  SlSocialYoutube,
} from "react-icons/sl"
import LOGO_LIGHT from "../../assets/Logo-Only.png"
import { Link } from "react-router-dom"
import moment from "moment"
import { useAlert } from "react-alert"
import { useCanister } from "@connect2ic/react"
import { TailSpin } from "react-loader-spinner"

const Footer = () => {
  const alert = useAlert()
  const [backend] = useCanister("backend")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("") // Add state for email
  const [read, setRead] = useState(false)

  const validateForm = () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      alert.error("Please enter a valid email address")
      return false
    }
    return true
  }

  const record = {
    name: "...", // text
    read: read, // bool
    email: email, // text
    message: "...", // text
  }

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return
      }
      setLoading(true)
      const res = await backend.createContact(record)
      console.log(res)
      if ("ok" in res) {
        alert.success("We'll contact you shortly.")
        // getUser()
        setEmail("")
      }
    } catch (error) {
      console.error("An error occurred:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full  bg-gray-50 dark:bg-[#0e0702] relative py-16 px-5 md:px-5 overflow-hidden">
      <div className="md:container md:mx-auto">
        <h1 className="text-4xl md:text-8xl text-gray-200/50 dark:text-white/10 uppercase tracking-[10px] font-black absolute -top-2.5 md:-top-5 -right-2 ">
          stay connected
        </h1>
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8 items-center md:items-end mb-16">
          <div className="w-full md:w-2/3 flex flex-col gap-3">
            <h6 className="uppercase md:text-1xl lg:text-1.5xl font-normal tracking-wide text-black dark:text-white/80">
              enter your email below
            </h6>
            <div className="flex flex-row gap-2">
              <input
                type="email"
                placeholder="inform me"
                className="bg-gray-50 dark:bg-[#0e0702] md:text-2xl lg:text-3xl border-b-[1.5px] border-black dark:border-white/50  w-full outline-none text-black dark:text-white/50 placeholder:text-black dark:placeholder:text-white/50 pb-0 md:pb-2 focus:border-b-[#D02D2D] dark:focus:border-b-[#D02D2D] rounded-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button
                onClick={handleSubmit}
                className={`p-2 border-[1.5px] w-[50px] h-[50px] flex items-center justify-center rounded-full border-black hover:border-[#D02D2D] text-black hover:text-[#D02D2D] transition-all ease-in-out duration-500 hover:rotate-180 ${loading && "opacity-50 border-[#D02D2D]"
                  }`}
                disabled={loading}
              >
                {loading ? (
                  <TailSpin
                    height="25"
                    width="25"
                    color="#D02D2D"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  <HiOutlineArrowLongLeft
                    className=""
                    size={25}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-8 ">
            <a href="#" target="blank">
              <SlSocialFacebook
                size={30}
                className="text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] transition-all duration-200 ease-in-out"
              />
            </a>
            <a href="#" target="blank">
              <SlSocialTwitter
                size={30}
                className="text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] transition-all duration-200 ease-in-out"
              />
            </a>
            <a href="#" target="blank">
              <SlSocialInstagram
                size={30}
                className="text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] transition-all duration-200 ease-in-out"
              />
            </a>
            <a href="#" target="blank">
              <SlSocialYoutube
                size={30}
                className="text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] transition-all duration-200 ease-in-out"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-6 mb-12">
          <div className="w-full md:w-1/3 flex flex-col gap-4 text-center md:text-left">
            <h6 className="uppercase text-2xl font-bold  text-black dark:text-white/70">
              Contact
            </h6>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:test@gmail.com"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                order@coffeeculture.asia
              </a>
              <a
                href="tel:+919876543210"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline  transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                +66 (0) 76 608 850
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3  flex flex-col gap-4 text-center md:text-left">
            <h6 className="uppercase text-2xl font-bold  text-black dark:text-white/70">
              Get Social
            </h6>
            <div className="flex flex-col gap-1">
              <a
                href="#"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                X (TWITTER)
              </a>
              <a
                href="#"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                discord
              </a>
              <a
                href="#"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                telegram
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3  flex flex-col gap-4 text-center md:text-left">
            <h6 className="uppercase text-2xl font-bold text-black dark:text-white/70">
              FAQ's
            </h6>
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                YOUR MEMBERSHIP
              </Link>
              <Link
                to="/"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                shipping & returns
              </Link>
              {/* <Link
                to="/"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                not finance advice
              </Link> */}
              <Link
                to="/"
                className="uppercase font-light tracking-wide cursor-pointer text-lg text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] underline transition-all ease-in-out duration-200 hover:translate-x-5"
              >
                Faq's
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-between">
          <div className="w-full md:w-3/4 flex flex-col justify-center md:justify-end items-center md:items-start gap-0 text-center">

            <h6 className="uppercase text-md font-light tracking-normal text-black dark:text-white/50">
              copyrights &copy; 2020-{moment().format("YY")} coffee unchained by {' '}
              <Link
              to="/"
              className="uppercase font-light tracking-wide cursor-pointer text-sm text-black dark:text-white/50 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] transition-all ease-in-out duration-200"
            >
                COFFEE CULTURE THAILAND
            </Link>
            </h6>
            

          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center md:justify-end items-center md:items-end">
            <img
              src={LOGO_LIGHT}
              alt="Coffee Culture"
              className="w-[200px] block dark:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
