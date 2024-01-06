import React, { useEffect, useState } from "react"
import BG from "../../../assets/coffees-bg.png"
import LOGO from "../../../assets/Logo-Only.png"
import { ConnectButton, ConnectDialog, useCanister, useConnect, useDialog } from "@connect2ic/react"
import { useAlert } from "react-alert"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { InfinitySpin } from "react-loader-spinner"

export default function Login() {
  const { open, close, isOpen } = useDialog()
  const { isConnected, disconnect, principal } = useConnect()
  const alert = useAlert()
  const location = useLocation();
  const navigate = useNavigate();
  const [backend] = useCanister("backend")
  const [isAdmin, setIsAdmin] = useState(true); // Add isAdmin state

  const loginHandler = () => {
    open()
    /* if (isConnected){
      alert.success("Login successfully.")
    } */
  }

  const logoutHandler = () => {
    disconnect()
    alert.success("Logout successfully.")
  }

/*   useEffect(() => {
    const checkIsAdmin = async () => {
      if (isConnected) {
        try {
          const res = await backend.isAdmin(principal);
          setIsAdmin(res);
        } catch (error) {
          console.error("Error checking isAdmin:", error);
          setIsAdmin(false); // Set isAdmin to false in case of an error
        }
      }
    };

    checkIsAdmin();
  }, [isConnected, backend, principal]); */

  return (
    <>
       {/* {isAdmin && isConnected ? <Navigate to='/admin' replace={true}></Navigate> : isConnected ? <Navigate to='/' replace={true}></Navigate>  : null}  */}
      {isConnected ? <Navigate to='/' replace={true}></Navigate>  : null}
      <div
        style={{ "--image-url": `url(${BG})` }}
        className="w-screen h-screen bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
      >
        <div className="bg-black/50 w-full h-full flex justify-center items-center h-full">
          <div className="w-[300px] bg-white rounded-3xl p-6">
            <div className="flex flex-col justify-center items-center">
              <img
                src={LOGO}
                alt={"CoffeeCulture"}
                className="h-[100px] mb-2"
              />
              <h1 className="text-lg font-semibold mb-6 uppercase">LOGIN TO YOUR MEMBERS ACCOUNT TO ACCESS COFFEE COURSES. IF YOU’RE NOT YET A MEMBER - <Link className="hover:text-[#228B22] text-[#4169E1]" to="/nft"> SIGN UP HERE</Link></h1>
              {!isConnected && <button className="tracking-widest bg-black px-8 py-2 text-lg text-white uppercase font-semibold w-full rounded-xl" onClick={loginHandler}>Login</button>}
             {/*  {isConnected && <button className="bg-black px-8 py-2 text-lg text-white uppercase font-semibold" onClick={logoutHandler}>Logout</button>} */}
             {/*  <ConnectButton className="!w-full !bg-red-500" >{isConnected ? 'Logout' : 'Login'}</ConnectButton> */}

              <ConnectDialog />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
