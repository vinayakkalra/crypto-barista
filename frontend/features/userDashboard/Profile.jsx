import React, { useEffect, useState } from "react"
import bg from "../../assets/bgac.png"
import Sidebar from "./Sidebar"
import {
  useBalance,
  useCanister,
  useConnect,
  useWallet,
} from "@connect2ic/react"
import { InfinitySpin, TailSpin } from "react-loader-spinner"
import { useAlert } from "react-alert"
import { QRCode } from "react-qrcode-logo"
import LOGO_LIGHT from "../../assets/logo.png"
import useClipboard from "react-use-clipboard"
import { RiCheckLine, RiCopyleftFill, RiFileCopyLine } from "react-icons/ri"

const Profile = () => {
  const alert = useAlert()
  const [wallet] = useWallet()
  const [assets] = useBalance()
  const [backend] = useCanister("backend")
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const { isConnected, principal } = useConnect()
  const [user, setUser] = useState([]) // Add state for email
  const [email, setEmail] = useState("") // Add state for email
  const [twitter, setTwitter] = useState("") // Add state for Twitter
  const [discord, setDiscord] = useState("") // Add state for Discord
  const [isCopied, setCopied] = useClipboard(principal,  {
    successDuration: 1000,
  });


  const validateForm = () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      alert.error("Please enter a valid email address");
      return false;
    }
    return true;
  };


  const getUser = async () => {
    try {
      setLoading2(true)
      const p = principal.toString()

      const item = await backend.getUser(p)
      if (item.ok) {
        setEmail(item.ok.email)
        setTwitter(item.ok.twitter)
        setDiscord(item.ok.discord)
        setUser(item.ok)
        console.log(item.ok)
      }
    } catch (error) {
      console.error("Error listing user:", error)
    } finally {
      setLoading2(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getUser()
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [backend])

  console.log(user)

  const updateProfileHandler = async () => {
    if (isConnected) {
      try {
        if (!validateForm()) {
          return;
        }
        setLoading(true)

        const res = await backend.createUser(email, discord, twitter)
        console.log(res)
        if ("ok" in res) {
          alert.success("User Profile Updated Successfully")
          // getUser()
        }
      } catch (error) {
        console.error("An error occurred:", error)
      } finally {
        setLoading(false)
      }
    } else {
      alert.success("Please Login First!")
      open()
    }
  }

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
          <div className="w-full md:w-4/5 bg-black/70 backdrop-blur-sm p-6">
            <div className="flex flex-col md:flex-row justify-start gap-4">
              <div className="flex flex-col gap-3 justify-start items-center w-full md:w-1/2">
                <h1 className="text-5xl uppercase text-white tracking-widest">
                  <span className="font-black">Account</span>
                  <br />
                  <span className="font-light"> details</span>
                </h1>
                <div className="flex justify-center p-5">
                  <QRCode
                    value={principal}
                    logoImage={LOGO_LIGHT}
                    qrStyle={"dots"}
                    eyeRadius={[
                      [10, 10, 0, 10], // top/left eye
                      [10, 10, 10, 0], // top/right eye
                      [10, 0, 10, 10], // bottom/left
                    ]}
                    logoPaddingStyle={"square"}
                    logoPadding={'5'}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col w-full mb-3 relative">
                  <label
                    htmlFor=""
                    className="text-white text-sm font-semibold"
                  >
                    Principal Id
                  </label>
                  <input
                    type="text"
                    className="border bg-transparent px-2 py-1.5 border-gray-400 w-full outline-none text-gray-400 pr-8"
                    value={wallet ? wallet.principal : "-"}
                    readOnly={true}
                    disabled={true}
                  />
                  <button onClick={() => {setCopied(), alert.success("Principal copied successfully")}} className="absolute bottom-2 right-2 text-gray-400">
                    {isCopied ? <RiCheckLine className="w-5 h-5  text-emerald-500"/> : <RiFileCopyLine className="w-5 h-5 text-gray-400"/>}
                  </button>
                </div>
                {assets ? (
                  <div className="grid grid-cols-2 gap-3">
                    {assets
                      .filter(
                        (asset) =>
                          asset.name === "ICP" || asset.name === "ckBTC",
                      )
                      .map((asset, i) => (
                        <div className="flex flex-col w-full mb-3" key={i}>
                          <label
                            htmlFor=""
                            className="text-white text-sm font-semibold"
                          >
                            {asset.name} Amount{" "}
                          </label>
                          <input
                            type="text"
                            key={asset.canisterId}
                            className="border bg-transparent px-2 py-1.5 border-gray-400 w-full outline-none text-gray-400"
                            value={asset.amount}
                            readOnly={true}
                            disabled={true}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center mb-3 gap-3">
                    <div className="w-1/2 h-[45px] bg-black/50 animate-pulse"></div>
                    <div className="w-1/2 h-[45px] bg-black/50 animate-pulse"></div>
                  </div>
                )}

                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor=""
                      className="text-white text-sm font-semibold"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="border bg-transparent px-2 py-1.5 border-[#ffffff] w-full outline-none text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor=""
                      className="text-white text-sm font-semibold"
                    >
                      Twitter
                    </label>
                    <input
                      type="text"
                      className="border bg-transparent px-2 py-1.5 border-[#ffffff] w-full outline-none text-white"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor=""
                      className="text-white text-sm font-semibold"
                    >
                      Discord
                    </label>
                    <input
                      type="text"
                      className="border bg-transparent px-2 py-1.5 border-[#ffffff] w-full outline-none text-white"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex justify-start w-full mt-2">
                    <button
                      onClick={updateProfileHandler}
                      className={`bg-[#cf2d2d] py-2 px-4 uppercase text-white tracking-widest flex gap-2 ${
                        loading && "opacity-50"
                      }`}
                      disabled={loading}
                    >
                      {loading ? (
                        <TailSpin
                          height="20"
                          width="20"
                          color="white"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          visible={true}
                        />
                      ) : (
                        ""
                      )}
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
