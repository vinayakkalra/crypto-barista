import React, { Fragment, useEffect, useRef, useState } from "react";
import LOGO_LIGHT from "../../assets/Logo-Only.png";
import {
  RiDashboardFill,
  RiDashboardLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiHome2Line,
  RiMailLine,
  RiNftFill,
  RiNftLine,
  RiShoppingBag2Line,
  RiStickyNote2Fill,
  RiStickyNote2Line,
  RiUser3Fill,
  RiUser3Line,
  RiUser4Line,
  RiVideoAddLine,
} from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import { HiOutlineUser, HiOutlineShoppingCart, HiUser } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ConnectButton,
  ConnectDialog,
  useCanister,
  useConnect,
  useDialog,
} from "@connect2ic/react";
import { Menu, Transition } from "@headlessui/react";
import { TailSpin } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { GiCoffeeBeans } from "react-icons/gi";
import { MdCardMembership } from "react-icons/md";

const Navbar = () => {
  const [backend] = useCanister("backend");
  const [carts, setCarts] = useState([]);
  const { isConnected, disconnect, principal } = useConnect();
  const alert = useAlert();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  //const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        if (isConnected) {
          const res = await backend.isAdmin(principal);
          setIsAdmin(res);
        }
      } catch (error) {
        console.error("Error checking isAdmin:", error);
        setIsAdmin(false); // Set isAdmin to false in case of an error
      }
    };

    checkIsAdmin();
  }, [isConnected, backend, principal, navigate]);

  useEffect(() => {
    const listCarts = async () => {
      try {
        //setLoading(true)
        const cart = await backend.listCartItems();
        setCarts(cart);
        //console.log(cart)
      } catch (error) {
        console.error("Error listing carts:", error);
        //}finally {
        // setLoading(false)
      }
    };

    listCarts();

    const intervalId = setInterval(listCarts, 1000);
    return () => clearInterval(intervalId);
  }, [backend]);

  const filterItems = carts.filter(
    (item) => item[1].principal.toText() === principal
  );

  // Add an effect to handle scrolling when `nav` changes
  useEffect(() => {
    if (nav) {
      // When `nav` is true, disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // When `nav` is false, enable scrolling
      document.body.style.overflow = "visible";
    }

    // Clean up the effect
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [nav]);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    {
      icon: <RiHome2Line size={25} className="mr-4" />,
      text: "HOME",
      route: "/",
    },
    {
      icon: <RiVideoAddLine size={25} className="mr-4" />,
      text: "COFFEE COURSES",
      route: "/courses",
    },
    {
      icon: <RiShoppingBag2Line size={25} className="mr-4" />,
      text: "MERCHANDISES",
      route: "/merchandise",
    },
    {
      icon: <GiCoffeeBeans size={25} className="mr-4" />,
      text: "BUY COFFEE",
      route: "https://coffeeculture.asia",
    },
    {
      icon: <MdCardMembership size={25} className="mr-4" />,
      text: "MEMBERSHIP",
      route: "/nft",
    },
    {
      icon: <RiMailLine size={25} className="mr-4" />,
      text: "GET IN TOUCH",
      route: "/#getintouch",
    },
    {
      icon: <RiNftLine size={25} className="mr-4" />,
      text: "NFTs",
      route: "/nft",
    },
    {
      icon: <RiUser3Line size={25} className="mr-4" />,
      text: "MY ACCOUNT",
      route: "/my-dashboard",
    },
  ];

  return (
    <>
      <div
        className={`${
          isSticky
            ? "bg-white/50 dark:bg-[#0e0702]/50 backdrop-blur-md text-black shadow-lg animate__animated  animate__fadeInDown"
            : "bg-transparent"
        }  transition-all ease-in-out duration-200 w-full z-10 p-5 fixed top-0 left-0`}
      >
        <div className="flex flex-row justify-between items-center md:container md:mx-auto">
          <div
            className="hamburger-icon cursor-pointer "
            onClick={() => setNav(!nav)}
          >
            <span className="line line-1 mb-2 bg-black dark:bg-white"></span>
            <span className="line line-2 mb-2 bg-black dark:bg-white"></span>
            <span className="line line-3 bg-black dark:bg-white"></span>
          </div>

          <div className="flex justify-end items-center gap-4">
            <div>
              <Menu as="div" className="relative inline-block text-left">
                <div className="mb-0">
                  <Menu.Button>
                    <HiOutlineUser
                      size={35}
                      className="text-black dark:text-white mb-0"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 dark:divide-red-900/10 rounded-2xl bg-white dark:bg-[#180D05] shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {isConnected ? (
                      <>
                        {isAdmin && (
                          <div className="px-2 py-2 ">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/admin"
                                  className={`${
                                    active
                                      ? "bg-gray-100 dark:bg-[#100903] text-black dark:text-white"
                                      : "text-black dark:text-white"
                                  } group flex w-full items-center rounded-xl px-4 py-4 text-lg font-semibold tracking-wider`}
                                >
                                  {active ? (
                                    <RiDashboardFill
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <RiDashboardLine
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Admin Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                        )}

                        <div className="px-2 py-2 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/my-profile"
                                className={`${
                                  active
                                    ? "bg-gray-100 dark:bg-[#100903] text-black dark:text-white"
                                    : "text-black dark:text-white"
                                } group flex w-full items-center rounded-xl px-4 py-4 text-lg font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <RiUser3Fill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiUser3Line
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          {/* <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/my-orders"
                                className={`${
                                  active
                                    ? "bg-gray-100 dark:bg-[#100903] text-black dark:text-white"
                                    : "text-black dark:text-white"
                                } group flex w-full items-center rounded-xl px-4 py-4 text-lg font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <RiStickyNote2Fill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiStickyNote2Line
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Orders
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/my-nfts"
                                className={`${
                                  active
                                    ? "bg-gray-100 dark:bg-[#100903] text-black dark:text-white"
                                    : "text-black dark:text-white"
                                } group flex w-full items-center rounded-xl px-4 py-4 text-lg font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <RiNftFill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiNftLine
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                My NFTs
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/wishlist"
                                className={`${
                                  active
                                    ? "bg-gray-100 dark:bg-[#100903] text-black dark:text-white"
                                    : "text-black dark:text-white"
                                } group flex w-full items-center rounded-xl px-4 py-4 text-lg font-semibold tracking-wider`}
                              >
                                {active ? (
                                  <RiHeart3Fill
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <RiHeart3Line
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                                Wishlist
                              </Link>
                            )}
                          </Menu.Item> */}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <div className="px-2 py-2">
                      <Menu.Item>
                        {/* <ConnectButton className="!w-full !bg-red-500">{isConnected ? 'Logout' : 'Login'}</ConnectButton> */}
                        {isConnected ? (
                          <button
                            onClick={() => {
                              disconnect();
                              alert.success("Logout successfully.");
                            }}
                            className="tracking-wider bg-black px-8 py-2 text-lg text-white uppercase font-semibold w-full rounded-xl"
                          >
                            Logout
                          </button>
                        ) : (
                          <button
                            onClick={() => navigate("/login")}
                            className="tracking-wider bg-black px-8 py-2 text-lg text-white uppercase font-semibold w-full rounded-xl"
                          >
                            Log in/Connect
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <Link to={isConnected ? "/cart" : "/login"} className="relative">
              <HiOutlineShoppingCart
                size={35}
                className="text-black dark:text-white"
              />
              {/* {loading ? ( */}
              <span className="bg-red-500 rounded-full absolute top-0 right-0 p-1 w-4 h-4 text-xs text-center flex justify-center items-center text-white">
                {filterItems.length}
              </span>
              {/* ) : (<span className="bg-red-500 animate-pulse rounded-full absolute top-0 right-0 p-1 w-4 h-4 text-xs text-center flex justify-center items-center text-white">
              </span>)} */}
            </Link>
          </div>
        </div>
      </div>
      {/* {nav ? (
        <div className="fixed top-0 left-0 w-full h-screen z-10 bg-black/80 backdrop-blur-md p-2"></div>
      ) : (
        ""
      )} */}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "animate-fade fixed top-0 left-0 w-full h-screen bg-white/50 dark:bg-[#0e0702]/50 backdrop-blur-md z-20 transition-all duration-700"
            : " animate-fade fixed top-0 left-[-100%] w-full h-screen bg-white/50  dark:bg-[#0e0702]/50 backdrop-blur-md z-20 transition-all duration-700 "
        }
      >
        <div className="w-full h-full flex flex-col md:flex-row justify-around items-center pb-28 md:pb-0">
          <div className="flex justify-center items-center">
            <img
              src={LOGO_LIGHT}
              alt="Coffee Culture"
              className="w-[200px] block dark:hidden"
            />
          </div>
          <div className="flex justify-center items-center">
            <nav>
              <ul className="flex flex-col text-gray-800">
                {menuItems.map(({ icon, text, route }, index) => {
                  return (
                    <NavLink
                      to={route}
                      onClick={() => {
                        setNav(false);
                      }}
                      key={index}
                      className={({ isActive }) =>
                        isActive
                          ? " py-4 cursor-pointer text-xl text-[#D02D2D] font-semibold transition-all ease-in-out delay-100 duration-300"
                          : " py-4 cursor-pointer text-xl text-black dark:text-white hover:text-[#D02D2D] dark:hover:text-[#D02D2D] font-semibold hover:-translate-x-4 transition-all ease-in-out delay-100 duration-300"
                      }
                    >
                      <li className="flex items-center">
                        {icon} {text}
                      </li>
                    </NavLink>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="flex justify-center items-center">
            <TfiClose
              onClick={() => setNav(!nav)}
              size={50}
              className="cursor-pointer text-black dark:text-white border-[1px] border-black dark:border-white p-3 rounded-full hover:rotate-90 transition-all ease-in-out delay-100 duration-300 hover:text-[#D02D2D] dark:hover:text-[#D02D2D] hover:border-[#D02D2D] dark:hover:border-[#D02D2D]"
            />
          </div>
        </div>
      </div>
      <ConnectDialog />
    </>
  );
};

export default Navbar;
