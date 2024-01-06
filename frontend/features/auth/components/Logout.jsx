import React from "react"
import BG from "../../../assets/coffees-bg.png"
import LOGO from "../../../assets/Logo-Only.png"
import { ConnectDialog, useConnect, useDialog } from "@connect2ic/react"
import { useAlert } from 'react-alert';
import { Link, Navigate } from 'react-router-dom';

export default function Logout() {
  const { open, close, isOpen } = useDialog()
  const { isConnected, disconnect } = useConnect();
  const alert = useAlert();


  const loginHandler = () => {
    open()
    alert.success('Login successfully.');
  }

  const logoutHandler = () => {
    disconnect()
    alert.success('Logout successfully.');
  }

  return (
    <>
       {isConnected && <Navigate to="/" replace={true}></Navigate>} 
      <div
        style={{ "--image-url": `url(${BG})` }}
        className="w-screen h-screen bg-[image:var(--image-url)]"
      >
        <div className="bg-black/50 w-full h-full flex justify-center items-center h-full">
          <div className="w-[300px] bg-white rounded-none p-6">
            <div className="flex flex-col justify-center items-center">
              <img src={LOGO} alt={'CoffeeCulture'} className="h-[100px] mb-2"/>
              <h1 className="text-lg font-semibold mb-6">Login to continue</h1>
              {!isConnected && <button className="bg-black px-8 py-2 text-lg text-white uppercase font-semibold" onClick={loginHandler}>Login</button>}
              {isConnected && <button className="bg-black px-8 py-2 text-lg text-white uppercase font-semibold" onClick={logoutHandler}>Logout</button>}
              <ConnectDialog/>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
