import { useCanister } from "@connect2ic/react"
import React, { useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { TailSpin } from "react-loader-spinner"
import { Link } from "react-router-dom"
import placeholderImg from "../../assets/placeholderImg.png"
import {
  HiOutlineArrowDown,
  HiOutlineArrowRight,
  HiOutlineTrash,
  HiOutlineTruck,
} from "react-icons/hi2"
import { SiInternetcomputer } from "react-icons/si"
import moment from "moment"
import ProductCard from "./ProductCard"

const OrderCard = ({ order, setOrder, loading }) => {
  const [backend] = useCanister("backend")
  const alert = useAlert()
  const [showDetails, setShowDetails] = useState(false)

  console.log(order)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const getDate = (timestamp) => {
    const converted = Number(timestamp) / 1000000
    const date = new Date(converted)
    return `${date}`
  }
  return (
    <>
      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-4">
        <div className="flex w-full justify-start items-center gap-3">
          <div className="w-.5/5 flex-none">
            {loading ? (
              <div className="w-[100px] h-[100px] rounded-xl bg-gray-100 animate-pulse"></div>
            ) : (
              <Link to={`/product/${order[1]?.products[0]?.slug}`}>
                <img
                  src={
                    order[1]?.products[0]?.img1
                      ? order[1]?.products[0]?.img1
                      : placeholderImg
                  }
                  alt={"product"}
                  className="w-[100px] h-[100px] rounded-xl shadow-sm"
                />
              </Link>
            )}
          </div>
          <div className="w-4.5/5">
            <h6 className="text-xl uppercase text-black font-semibold line-clamp-2 leading-tight mb-1 line-clamp-1">
              {loading ? (
                <div className="w-[200px] h-[25px] rounded-xl bg-gray-100 animate-pulse"></div>
              ) : (
                order[1]?.id
              )}
            </h6>
            <h6 className="w-1/2 text-sm text-gray-500 font-light rounded-3xl">
              {loading ? (
                <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
              ) : (
                moment(getDate(order[1]?.timeCreated)).format(
                  "MMM Do YYYY, h:mm a",
                )
              )}
            </h6>
          </div>
        </div>
        <div className="flex w-full justify-start md:justify-center  items-center gap-3">
          <div className="w-full">
            <h6 className="text-xs uppercase text-black font-light mb-0">
              {loading ? (
                <div className="w-[80px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
              ) : (
                "Total Amount"
              )}
            </h6>
            <h6 className="text-xl uppercase text-black font-semibold tracking-widest">
              {loading ? (
                <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
              ) : (
                <span className="flex items-center gap-1">
                  <SiInternetcomputer className="w-5 h-5" />{" "}
                  {order[1]?.totalAmount.toFixed(2)}
                </span>
              )}
            </h6>
          </div>
          <div className="w-full flex justify-end md:justify-center items-center gap-4">
            {loading ? (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
              </div>
            ) : (
              <div className="w-full flex justify-end md:justify-center items-center gap-4">
                <a
                  href={order[1]?.awb}
                  target="blank"
                  className="w-8 h-8 bg-black text-white rounded-full p-1 cursor-pointer"
                >
                  <HiOutlineTruck
                    title="Track Order"
                    className={`w-full h-full `}
                  />
                </a>
                <button
                  onClick={toggleDetails}
                  className="w-8 h-8 bg-black text-white rounded-full p-1 cursor-pointer"
                >
                  {showDetails ? (
                    <HiOutlineArrowDown
                      title="Product Items"
                      className={`w-full h-full `}
                    />
                  ) : (
                    <HiOutlineArrowRight
                      title="Product Items"
                      className={`w-full h-full `}
                    />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="w-full p-4 mt-4 bg-gray-100 rounded-none">
          <div className=" flex flex-col gap-2 mb-4">
            {order[1]?.products?.map((product, i) => (
              <ProductCard key={i} product={product} loading={loading} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <div className="flex flex-col gap-0 leading-tight">
              <h6 className="text-sm font-light text-black uppercase tracking-wide">
                Payment Method
              </h6>
              <h6 className="text-lg font-semibold text-black">
                {loading ? (
                  <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                ) : (
                  order[1]?.paymentMethod
                )}
              </h6>
            </div>
            <div className="flex flex-col gap-0 leading-tight">
              <h6 className="text-sm font-light text-black uppercase tracking-wide">
                Subtotal Amount
              </h6>
              <h6 className="text-lg font-semibold text-black">
                {loading ? (
                  <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                ) : (
                  <span className="flex items-center gap-1">
                    <SiInternetcomputer className="w-5 h-5" />{" "}
                    {order[1]?.subTotalAmount.toFixed(2)}
                  </span>
                )}
              </h6>
            </div>
            <div className="flex flex-col gap-0 leading-tight">
              <h6 className="text-sm font-light text-black uppercase tracking-wide">
                Shipping Amount
              </h6>
              <h6 className="text-lg font-semibold text-black">
                {loading ? (
                  <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                ) : (
                  <span className="flex items-center gap-1">
                    <SiInternetcomputer className="w-5 h-5" />{" "}
                    {order[1]?.shippingAmount.toFixed(2)}
                  </span>
                )}
              </h6>
            </div>
            <div className="flex flex-col gap-0 leading-tight">
              <h6 className="text-sm font-light text-black uppercase tracking-wide">
                Total Amount
              </h6>
              <h6 className="text-lg font-semibold text-black">
                {loading ? (
                  <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                ) : (
                  <span className="flex items-center gap-1">
                    <SiInternetcomputer className="w-5 h-5" />{" "}
                    {order[1]?.totalAmount.toFixed(2)}
                  </span>
                )}
              </h6>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-0 leading-tight">
              <h6 className="text-sm font-light text-black uppercase tracking-wide">
                Address
              </h6>
              <h6 className="text-sm font-semibold text-black">
                {`${order[1]?.shippingAddress?.firstName} ${order[1]?.shippingAddress?.lastName}`}
                <br />
                {`${order[1]?.shippingAddress?.street}, ${order[1]?.shippingAddress?.city}, ${order[1]?.shippingAddress?.state}, ${order[1]?.shippingAddress?.country} - ${order[1]?.shippingAddress?.postCode}`}
                <br />
                {`${order[1]?.shippingAddress?.mobile}`}
              </h6>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-0 leading-tight">
                <h6 className="text-sm font-light text-black uppercase tracking-wide  flex items-center gap-1">
                  Payment Status{" "}
                </h6>
                {loading ? (
                  <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                ) : (
                  <>
                    {order[1]?.paymentStatus === "pending" ? (
                      <h6 className="text-lg font-semibold uppercase text-yellow-500">
                        pending
                      </h6>
                    ) : order[1]?.paymentStatus === "rejected" ? (
                      <h6 className="text-lg font-semibold uppercase text-red-500">
                        rejected
                      </h6>
                    ) : order[1]?.paymentStatus === "success" ? (
                      <h6 className="text-lg font-semibold uppercase text-green-500">
                        success
                      </h6>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-col gap-0 leading-tight">
                <h6 className="text-sm font-light text-black uppercase tracking-wide flex items-center gap-1">
                  Order Status{" "}
                </h6>
                {loading ? (
                  <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                ) : (
                  <>
                    {order[1]?.orderStatus === "processing" ? (
                      <div className="text-lg font-semibold uppercase text-yellow-500">
                        processing
                      </div>
                    ) : order[1]?.orderStatus === "confirmed" ? (
                      <div className="text-lg font-semibold uppercase text-amber-500">
                        confirmed
                      </div>
                    ) : order[1]?.orderStatus === "shipped" ? (
                      <div className="text-lg font-semibold uppercase text-blue-500">
                        shipped
                      </div>
                    ) : order[1]?.orderStatus === "delivered" ? (
                      <div className="text-lg font-semibold uppercase text-green-500">
                        delivered
                      </div>
                    ) : order[1]?.orderStatus === "cancelled" ? (
                      <div className="text-lg font-semibold uppercase text-red-500">
                        cancelled
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderCard
