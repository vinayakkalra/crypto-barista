import { useConnect } from "@connect2ic/react";
import React from "react";
import { useAlert } from "react-alert";
import { CiGrid41, CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

const TopBar = ({ sidebar, setSidebar }) => {
    const { disconnect } = useConnect()
    const alert = useAlert()

    return (
        <div className="w-full bg-white dark:bg-slate-800 sticky top-0 z-40 rounded-2xl p-2">
            <div className="flex justify-between items-center">
                <div>
                    <button
                        className="bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/40 dark:hover:bg-[#330000]/40 text-[#330000] rounded-xl p-2 flex justify-center items-center"
                        onClick={() => setSidebar(!sidebar)}
                    >
                        <CiGrid41 className="w-8 h-8" />
                    </button>
                </div>
                <div>
                <button 
                    className="bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/40 dark:hover:bg-[#330000]/40 text-[#330000] rounded-xl p-2 flex justify-center items-center"
                    onClick={() => {
                        disconnect()
                        alert.success("Logout successfully.")
                      }}
                >
                  <CiLogout className="w-8 h-8" />
                </button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
