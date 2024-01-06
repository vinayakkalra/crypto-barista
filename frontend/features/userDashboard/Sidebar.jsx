import React from 'react'
import { NavLink } from "react-router-dom"
import { RiHeart3Line, RiHome4Line, RiNftLine, RiShoppingBag3Line, RiStickyNote2Line, RiUser3Line, RiUser4Line } from "react-icons/ri"

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3 w-full md:w-1/4">
            {/* <h2 className="uppercase font-black text-black text-4xl tracking-wider">
              Menu
            </h2> */}
            <div className="bg-black/70 backdrop-blur-sm p-4">
              <div className="flex flex-col gap-2">
                <NavLink
                  to={"/my-dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center uppercase tracking-wide gap-2 font-semibold text-lg p-2 bg-white text-black"
                      : "flex justify-start items-center uppercase tracking-wide gap-2 text-white font-semibold text-lg p-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300"
                  }
                >
                  <RiHome4Line className="w-5 h-5" /> dashboard
                </NavLink>
                <NavLink
                  to={"/my-profile"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center uppercase tracking-wide gap-2 font-semibold text-lg p-2 bg-white text-black"
                      : "flex justify-start items-center uppercase tracking-wide gap-2 text-white font-semibold text-lg p-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300"
                  }
                >
                  <RiUser3Line className="w-5 h-5" /> Profile
                </NavLink>
                <NavLink
                  to={"/my-orders"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center uppercase tracking-wide gap-2 font-semibold text-lg p-2 bg-white text-black"
                      : "flex justify-start items-center uppercase tracking-wide gap-2 text-white font-semibold text-lg p-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300"
                  }
                >
                  <RiStickyNote2Line className="w-5 h-5" /> Orders
                </NavLink>
                <NavLink
                  to={"/my-nft"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center uppercase tracking-wide gap-2 font-semibold text-lg p-2 bg-white text-black"
                      : "flex justify-start items-center uppercase tracking-wide gap-2 text-white font-semibold text-lg p-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300"
                  }
                >
                  <RiNftLine className="w-5 h-5" /> Nft
                </NavLink>
                <NavLink
                  to={"/cart"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center uppercase tracking-wide gap-2 font-semibold text-lg p-2 bg-white text-black"
                      : "flex justify-start items-center uppercase tracking-wide gap-2 text-white font-semibold text-lg p-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300"
                  }
                >
                  <RiShoppingBag3Line className="w-5 h-5" /> cart
                </NavLink>
              </div>
              <NavLink
                  to={"/wishlist"}
                  className={({ isActive }) =>
                    isActive
                      ? "flex justify-start items-center uppercase tracking-wide gap-2 font-semibold text-lg p-2 bg-white text-black"
                      : "flex justify-start items-center uppercase tracking-wide gap-2 text-white font-semibold text-lg p-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300"
                  }
                >
                  <RiHeart3Line className="w-5 h-5" /> Favourite
                </NavLink>
            </div>
          </div>
  )
}

export default Sidebar