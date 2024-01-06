import { useCanister } from "@connect2ic/react"
import React, { useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { TailSpin } from "react-loader-spinner"
import { Link } from "react-router-dom"
import placeholderImg from "../../assets/placeholderImg.png"
import { HiOutlineArrowRight, HiOutlineTrash } from "react-icons/hi2"
import { SiInternetcomputer } from "react-icons/si"

const WishlistItemCard = ({ wishlist, setWishlist }) => {
  const [backend] = useCanister("backend")
  const [product, setProduct] = useState([])
  const alert = useAlert()
  const [loading, setLoading] = useState(true)
  const [loading3, setLoading3] = useState(false)

  const listWishlistItem = async () => {
    try {
      // setLoading(true)

      const items = await backend.listWishlistItems()
      setWishlist(items)
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

      const product2 = await backend.getProduct(wishlist[1]?.product_slug)
      setProduct(product2.ok)
      //console.log(product2.ok)
    } catch (error) {
      console.error("Error listing Product:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeToWishlistHandler = async () => {
    try {
      //console.log(wishlistItem[0][1].id)
      setLoading3(true)
      const res = await backend.deleteWishlistItems(wishlist[1].id)
      console.log(res)
      if ("ok" in res) {
        alert.success("The product has been removed to your wishlist.")
        listWishlistItem()
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error)
    } finally {
      setLoading3(false) // Set loading to false when the update is complete (success or error)
    }
  }
  //console.log(cart[1]?.principal?.toText());

  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-4">
      <div className="flex w-full justify-start items-center gap-3">
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
        <div className="w-4.5/5">
          <h6 className="w-1/2 text-sm uppercase text-gray-500 font-light rounded-3xl mb-1">
            {loading ? (
              <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
            ) : (
              product?.category
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
      </div>
      <div className="flex w-full justify-start md:justify-center  items-center gap-3">
        <div className="w-full">
          <h6 className="text-xs uppercase text-black font-light mb-0">
            {loading ? (
              <div className="w-[80px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
            ) : (
              "Price"
            )}
          </h6>
          <h6 className="text-xl uppercase text-black font-semibold tracking-widest">
            {loading ? (
              <div className="w-[100px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
            ) : (
                <span className="flex items-center gap-1"><SiInternetcomputer className="w-5 h-5" /> {product?.price?.toFixed(2)}
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
                    title="Remove Item"
                    className={`w-full h-full`}
                    onClick={removeToWishlistHandler}
                  />
                )}
              </button>
              <Link to={`/product/${product?.slug}`} className="w-8 h-8 bg-black text-white rounded-full p-1 cursor-pointer">
              <HiOutlineArrowRight
                    title="Go to Item"
                    className={`w-full h-full `}
                  />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default WishlistItemCard
