import React, { useEffect, useState } from "react"
import placeholderImg from "../../assets/placeholderImg.png"
import { useCanister } from "@connect2ic/react"
import {
  HiOutlineCheck,
  HiOutlineMinusSmall,
  HiOutlinePlusSmall,
  HiOutlineTrash,
} from "react-icons/hi2"
import { Link, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { TailSpin } from "react-loader-spinner"
import { SiInternetcomputer } from "react-icons/si"

const CartCard = ({ cart, setCarts}) => {
  // console.log(cart[1]?.qty)
  const [backend] = useCanister("backend")
  const [product, setProduct] = useState([])
  const [qty, setQty] = useState(Number(cart[1]?.qty))
  const alert = useAlert()
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)

    const listCarts = async () => {
      try {
       // setLoading(true)

        const cart = await backend.listCartItems()
        setCarts(cart)
        //console.log(cart)
      } catch (error) {
        console.error("Error listing carts:", error)
     // }finally {
      //  setLoading(false)
      }
    }


  useEffect(() => {
    getProduct()
  }, [backend])

  const getProduct = async () => {
    try {
      setLoading(true)

      const product2 = await backend.getProduct(cart[1]?.product_slug)
      setProduct(product2.ok)
      //console.log(product2.ok)
    } catch (error) {
      console.error("Error listing Product:", error)
    } finally {
      setLoading(false)
    }
  }


  const total = product?.price?.toFixed(2) * qty

  const incrementHandler = () => {
    setQty(qty + 1)
  }

  const decrementHandler = () => {
    if (qty > 1) {
      setQty(qty - 1)
    }
  }

  const updateCartHandler = async () => {
    try {
      setLoading2(true)
      const res = await backend.updateCartItems(cart[1]?.id, qty)
      console.log(res)
      if ("ok" in res) {
        alert.success("The product has been updated to your cart.")
        listCarts()
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error)
    } finally {
      setLoading2(false) // Set loading to false when the update is complete (success or error)
    }
  }

  const deleteCartHandler = async () => {
    try {
      setLoading3(true)

      const res = await backend.deleteCartItems(cart[1]?.id)
      console.log(res)
      if ("ok" in res) {
        alert.success("The product has been removed to your cart.")
        listCarts()
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error)
    } finally {
      setLoading3(false)
    }
  }
  //console.log(cart[1]?.principal?.toText());

  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-4">
      <div className="flex justify-start items-center gap-4">
        <div className="w-.5/5 flex-none">
          {loading ? (
            <div className="w-[100px] h-[100px] rounded-xl bg-gray-100 animate-pulse"></div>
          ) : (
            <Link to={`/product/${product?.slug}`}>
              <img
                src={product?.img1 ? product?.img1 : placeholderImg}
                alt={"product"}
                className="w-[100px] h-[100px] rounded-xl shadow-sm"
              />
            </Link>
          )}
        </div>
        <div className="w-3/5">
          <h6 className="w-1/2 text-sm uppercase text-gray-500 font-light rounded-3xl mb-1">
            {loading ? (
              <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
            ) : (
              /* product?.category */ "YOU'RE BUYING"
            )}
          </h6>
          <h6 className="text-xl uppercase text-black font-semibold line-clamp-2 leading-tight">
            {loading ? (
              <div className="w-[200px] h-[25px] rounded-xl bg-gray-100 animate-pulse"></div>
            ) : (
              product?.title
            )}
          </h6>
        </div>
        <div className="w-1/5">
          <h6 className="text-xs uppercase text-black font-light mb-0">
          {loading ? (
              <div className="w-[80px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
            ) : (
            'Price'
            )}
          </h6>
          <h6 className="text-xl uppercase text-black font-semibold tracking-widest">
            {loading ? (
              <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
            ) : (<span className="flex items-center gap-1"><SiInternetcomputer className="w-5 h-5" /> {product?.price?.toFixed(2)}
            </span>)}
          </h6>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/5">
        {loading ? (
            <div className="w-[80px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
          ) : (
          <h6 className="text-xs uppercase text-black font-light mb-0">QTY</h6>)}
          {loading ? (
            <div className="w-[100px] h-[25px] rounded-xl bg-gray-100 animate-pulse "></div>
          ) : (
            <div className="flex justify-start items-center gap-2">
              {qty === 1 ? (
                <HiOutlineMinusSmall
                  className="w-6 h-6 cursor-not-allowed opacity-50"
                  disabled={true}
                />
              ) : (
                <HiOutlineMinusSmall
                  className="w-6 h-6 cursor-pointer"
                  onClick={decrementHandler}
                />
              )}

              <h6 className="text-xl text-black font-semibold tracking-widest">
                {qty}
              </h6>
              <HiOutlinePlusSmall
                className="w-6 h-6 cursor-pointer"
                onClick={incrementHandler}
              />
              {qty === Number(cart[1].qty) ? (
                ""
              ) : (
                <button
                  className={`w-7 h-7 bg-emerald-500 text-white rounded-full p-1 ${
                    loading2 && "opacity-50"
                  }`}
                  disabled={loading2 && true}
                >
                  {loading2 ? (
                    <TailSpin
                      height="100%"
                      width="100%"
                      color="white"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      visible={true}
                    />
                  ) : (
                    <HiOutlineCheck
                      title="Update Cart Item"
                      className={`w-full h-full`}
                      onClick={updateCartHandler}
                    />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        <div className="w-3/5 flex justify-between items-center">
          <div>
            <h6 className="text-xs uppercase text-black font-light mb-0">
            {loading ? (
            <div className="w-[80px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
          ) : (
              
              'Total')}
            </h6>

            <h6 className="text-xl text-black font-semibold tracking-widest">
              {loading ? (
                <div className="w-[100px] h-[25px] rounded-xl bg-gray-100 animate-pulse"></div>
              ) : (
                <span className="flex items-center gap-1"><SiInternetcomputer className="w-5 h-5" />{total.toFixed(2)} </span>
              )}
            </h6>
          </div>
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
          ) : (
            <>
              <button
                className={`w-8 h-8 bg-red-500 text-white rounded-full p-1 ${
                  loading3 && "opacity-50"
                }`}
                disabled={loading3 && true}
              >
                {loading3 ? (
                  <TailSpin
                    height="100%"
                    width="100%"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  <HiOutlineTrash
                    title="Delete Item"
                    className={`w-full h-full`}
                    onClick={deleteCartHandler}
                  />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartCard
