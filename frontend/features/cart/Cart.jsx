import React, { useEffect, useState } from "react"
import { IoHeartOutline, IoHeart } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import { useCanister, useConnect, useDialog } from "@connect2ic/react"
import { useAlert } from "react-alert"
import CartCard from "./CartCard"
import NoDataFound from "../common/empty/NoDataFound"
import { InfinitySpin } from "react-loader-spinner"
import { SiInternetcomputer } from "react-icons/si"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Cart = () => {
  const [backend] = useCanister("backend")
  const { principal } = useConnect()
  const [carts, setCarts] = useState([])
  const [loading, setLoading] = useState(true)
  const [subTotalAmount, setSubTotalAmount] = useState(0)
  const [products, setProducts] = useState([])
  const shippingAmount = 1
  const netAmount = subTotalAmount + shippingAmount
  useEffect(() => {
    const listCarts = async () => {
      try {
        setLoading(true)

        const cart = await backend.listCartItems()
        setCarts(cart)
        //console.log(cart)
      } catch (error) {
        console.error("Error listing carts:", error)
      } finally {
        setLoading(false)
      }
    }

    listCarts()
  }, [backend])

  const filterItems = carts?.filter(
    (item) => item[1]?.principal.toText() === principal,
  )

  useEffect(() => {
    const listProducts = async () => {
      try {
        const product = await backend.listProducts()
        setProducts(product)
      } catch (error) {
        console.error("Error listing products or categories:", error)
      }
    }

    listProducts()
  }, [backend])

  useEffect(() => {
    if (!filterItems || !products) return // Skip calculation if either is undefined
    const totalAmount = filterItems?.reduce(
      (accumulatedAmount, currentItem) => {
        const product = products?.find(
          (product) => product[1]?.slug === currentItem[1]?.product_slug,
        )
        if (!product || typeof product[1] === "undefined") {
          return accumulatedAmount // Skip this iteration if product or product[1] is undefined
        }
        const price = product[1]?.price || 0
        const qty = Number(currentItem[1]?.qty) || 0
        return accumulatedAmount + price * qty
      },
      0,
    )
    setSubTotalAmount(totalAmount)
  }, [filterItems, products])

  return (
    <div className="md:container md:mx-auto px-5 md:px-0 py-20">
      <div className="w-full">
        <div className="w-full relative flex justify-center items-center mb-20">
          <div className="border-2 w-1/2"></div>
          <div className="flex justify-between items-center absolute w-1/2">
            <Link
              to="/cart"
              className="bg-[#d02f2f] p-1 rounded-full w-10 h-10 flex justify-center items-center text-white text-lg font-semibold "
            >
              1
            </Link>
            <Link
              to="/checkout"
              className="bg-[#ffa07e] p-1 rounded-full w-10 h-10 flex justify-center items-center text-white text-lg font-semibold "
            >
              2
            </Link>
            {/* <Link
              to="/cart"
              className="bg-[#ffa07e] p-1 rounded-full w-10 h-10 flex justify-center items-center text-white text-lg font-semibold "
            >
              3
            </Link> */}
          </div>
        </div>
        {loading ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <InfinitySpin
              width="200"
              color="black"
              ariaLabel="tail-spin-loading"
              visible={true}
            />
          </div>
        ) : (
          <div>
            <div className="w-full flex flex-col">
              {filterItems?.length > 0 ? (
                <>
                  {filterItems?.map((item, index) => (
                    <CartCard
                      key={index}
                      cart={item}
                      setCarts={setCarts}
                      loadingCart={loading}
                    />
                  ))}
                </>
              ) : (
                <NoDataFound title={"Items Not Found"} />
              )}
            </div>
            {filterItems?.length > 0 ? (
              <>
                <div className="w-full flex justify-end mt-10">
                  <div className="w-full md:w-1/3">
                    <div className="grid grid-cols-2 gap-2 justify-end items-center w-full mb-1">
                      <h4 className="font-light text-black text-lg  tracking-wider flex justify-end">
                        Sub Total
                      </h4>
                      <h4 className="font-medium text-black text-2xl tracking-wider flex justify-end items-center gap-1">
                        <SiInternetcomputer className="w-6 h-6" />{" "}
                        {subTotalAmount.toFixed(2)}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 justify-end items-center w-full mb-4">
                      <h4 className="font-light text-black text-lg  tracking-wider flex justify-end">
                        Shipping Cost
                      </h4>
                      <h4 className="font-medium text-black text-2xl tracking-wider flex justify-end items-center gap-1">
                        <SiInternetcomputer className="w-6 h-6" />{" "}
                        {shippingAmount.toFixed(2)}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 justify-end items-center w-full mb-2">
                      <h4 className="font-semibold text-black text-3xl  tracking-wider flex justify-end">
                        Total
                      </h4>
                      <h4 className="font-semibold text-black text-3xl tracking-wider flex justify-end items-center gap-1">
                        <SiInternetcomputer className="w-6 h-6" />{" "}
                        {netAmount.toFixed(2)}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2 w-full mt-12">
                  <Link to='/merchandise' className="flex gap-2 justify-center items-center uppercase text-md font-medium tracking-widest text-white bg-black px-6 py-2 hover:bg-[#D02F2F] transition-all ease-in-out duration-300">
                  <BsArrowLeft className="w-6 h-6" />  Grab more stuff
                  </Link>
                  <Link to='/checkout' className="flex gap-2 justify-center items-center uppercase text-md font-medium tracking-widest text-white bg-[#D02F2F] px-6 py-2 hover:bg-black transition-all ease-in-out duration-300">
                    checkout <BsArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
