import React, { useState } from "react";
import { useCanister } from "@connect2ic/react";
import BG from "../../assets/contact.png";
import { PiDiscordLogoLight, PiTelegramLogoLight } from "react-icons/pi";
import { useAlert } from "react-alert";
import { TailSpin } from "react-loader-spinner";

const Contact = () => {
  const alert = useAlert();
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // Add state for email
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [read, setRead] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      alert.error("Please enter your name");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      alert.error("Please enter a valid email address");
      return false;
    }
    if (!message.trim()) {
      alert.error("Please enter your message");
      return false;
    }
    return true;
  };

  const record = {
    name: name, // text
    read: read, // bool
    email: email, // text
    message: message, // text
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      const res = await backend.createContact(record);
      console.log(res);
      if ("ok" in res) {
        alert.success("Details Sent Successfully. We'll contact you shortly.");
        setName("");
        setEmail("");
        setMessage("");
        // getUser()
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div
    //   className={`md:container md:mx-auto w-full min-h-screen bg-[url(${BG})] bg-cover bg-center bg-no-repeat relative overflow-hidden`}
    //   style={{ backgroundImage: `url(${BG})` }}
    // >
    <div
      className={`w-full min-h-screen bg-[url(${BG})] bg-cover bg-center bg-no-repeat relative overflow-hidden flex justify-center items-center`}
      style={{ backgroundImage: `url(${BG})` }}
    >
      <h1 className="text-7xl md:text-8xl text-gray-200/20 dark:text-white/10 uppercase tracking-[10px] font-black absolute -top-3 -right-1  md:-right-[225px] md:top-[245px] rotate-0 md:-rotate-90 z-0">
        contact
      </h1>

      <div className="w-full h-full flex justify-center items-center bg-black/60 dark:bg-black/70 p-5">
        <div className="py-20 md:container md:mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center gap-20">
          <div className="w-full md:w-2/5 flex flex-col items-center md:items-start">
            <h5 className="text-3xl font-semibold uppercase text-white dark:text-white/80 mb-2">
              Join your coffee tribe
            </h5>
            <h5 className="text-md font-normal text-white dark:text-white/50 mb-6 text-center md:text-left">
              Coffee connects people. Imagine meeting like-minded coffee
              enthusiasts, swapping stories, and sharing those brewing secrets.
              It's all here waiting for you. Join the community on Discord or
              Telegram.
            </h5>
            <div className="border-[1px] border-white dark:border-white/50 w-[150px] mb-6"></div>
            <a
              href="#"
              className="text-xl font-semibold uppercase text-white dark:text-white/80 mb-2 hover:text-[#8A2BE2] dark:hover:text-[#8A2BE2] transition-all ease-in-out duration-200 flex justify-start items-center gap-4"
            >
              JOIN US ON DISCORD
              <PiDiscordLogoLight size={50} />
            </a>
            <a
              href="#"
              className="text-xl font-semibold uppercase text-white dark:text-white/80 mb-2 hover:text-[#ADD8E6] dark:hover:text-[#ADD8E6] transition-all ease-in-out duration-200 flex justify-start items-center gap-4"
            >
              <PiTelegramLogoLight size={50} hover={{ fill: "blue" }} /> CONNECT
              ON TELEGRAM
            </a>
          </div>
          <div className="w-full md:w-3/5 flex flex-col gap-8 pl-0 md:pl-20">
            <div className="w-full">
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                className="bg-transparent text-white dark:text-white/50 placeholder:text-white dark:placeholder:text-white/50 border-b-2 border-white dark:border-white/50 outline-none w-full text-2xl pb-2 focus:border-[#D02D2D] hover:focus:border-[#D02D2D] transition-all ease-in-out duration-200 rounded-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent text-white dark:text-white/50 placeholder:text-white dark:placeholder:text-white/50 border-b-2 border-white dark:border-white/50 outline-none  w-full text-2xl pb-2 focus:border-[#D02D2D] hover:focus:border-[#D02D2D] transition-all ease-in-out duration-200 rounded-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="w-full">
              <textarea
                rows={5}
                name="message"
                placeholder="MESSAGE"
                className="bg-transparent text-white dark:text-white/50 placeholder:text-white dark:placeholder:text-white/50 border-b-2 border-white dark:border-white/50 outline-none w-full text-2xl pb-2 focus:border-[#D02D2D] hover:focus:border-[#D02D2D] transition-all ease-in-out duration-200 rounded-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
              ></textarea>
            </div>
            <div className="w-full flex justify-center md:justify-end z-10">
              <button
                onClick={handleSubmit}
                className={`flex justify-center items-center gap-2 uppercase bg-[#D02D2D] text-white p-2 font-semibold text-xl hover:bg-[#D02D2D] transition-all ease-in-out duration-200 pointer-cursor ${
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
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
