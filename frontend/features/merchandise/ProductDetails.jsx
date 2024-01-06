import React, { useEffect, useState } from "react"
import placeholderImg from "../../assets/placeholderImg.png"
import { IoHeartOutline, IoHeart } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import { useCanister, useConnect, useDialog } from "@connect2ic/react"
import { useAlert } from "react-alert"
import { TailSpin } from "react-loader-spinner"
import { SiInternetcomputer } from "react-icons/si"
import NoDataFound from "../common/empty/NoDataFound"
import ProductCard from "../home/ProductCard"

const ProductDetails = () => {
  const param = useParams()
  const alert = useAlert()
  const { principal, isConnected } = useConnect()
  const [backend] = useCanister("backend")
  const { open } = useDialog()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showFullText, setShowFullText] = useState(false)
  const [isFavorited, setFavorited] = useState(false)
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(false)
  const [carts, setCarts] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [isProductInLocalCart, setProductInLocalCart] = useState(false)
  const [isProductInLocalWishlist, setProductInLocalWishlist] = useState(false)

  const maxLength = 500 // Set your desired maximum length
  //console.log(principal)

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        setLoading(true)

        const product = await backend.getProduct(param.slug)
        setProduct(product.ok)
        //console.log(product.ok);
      } catch (error) {
        console.error("Error listing products or categories:", error)
      } finally {
        setLoading(false)
      }
    }

    getSingleProduct()
  }, [backend])


  const toggleShowMore = () => {
    setShowFullText(!showFullText)
  }

  /*   const toggleFavorite = () => {
    setFavorited(!isFavorited)
  } */

  const handleImageClick = (index) => {
    setSelectedImage(index)
  }

  useEffect(() => {
    const listCarts = async () => {
      try {
        setLoading3(true)

        const cart = await backend.listCartItems()
        setCarts(cart)
        //console.log(cart)
      } catch (error) {
        console.error("Error listing carts:", error)
      } finally {
        setLoading3(false)
      }
    }

    listCarts()
  }, [backend])

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInCart = carts.some(
      (item) =>
        item[1]?.product_slug === product?.slug &&
        item[1]?.principal.toText() === principal,
    )
    setProductInLocalCart(isProductInCart)
  }, [carts, product, principal])

  const addToCartHandler = async (product) => {
    // console.log(product);

    if (isConnected) {
      try {
        setLoading2(true)
        const qty = 1
        const res = await backend.addtoCartItems(product?.slug, qty)
        console.log(res)
        if ("ok" in res) {
          setProductInLocalCart(true)
          alert.success(
            "Great choice! The product has been added to your cart.",
          )
        }
      } catch (error) {
        console.error("An error occurred:", error)
      } finally {
        setLoading2(false)
      }
    } else {
      alert.success("Please Login First!")
      open()
    }
  }

  useEffect(() => {
    listWishlists()
  }, [backend])

  const listWishlists = async () => {
    try {
      //setLoading4(true)

      const wishlist2 = await backend.listWishlistItems()
      setWishlist(wishlist2)
      //console.log(cart)
    } catch (error) {
      console.error("Error listing carts:", error)
    } finally {
      // setLoading4(false)
    }
  }

  useEffect(() => {
    // Check if the product is in the local cart
    const isProductInWishlist = wishlist.some(
      (item) =>
        item[1].product_slug === product.slug &&
        item[1].principal.toText() === principal,
    )
    setProductInLocalWishlist(isProductInWishlist)
  }, [wishlist, product, principal])

  //console.log(wishlist[0].id)
  // console.log(wishlist[1]?.id)

  const addToWishlistHandler = async (product) => {
    // console.log(product);

    if (isConnected) {
      try {
        //console.log(fav)
        setLoading4(true)
        const res = await backend.addtoWishlist(product?.slug)
        console.log(res)
        if ("ok" in res) {
          setProductInLocalWishlist(true)
          alert.success(
            "Great choice! The product has been added to your wishlist.",
          )
          listWishlists()
        }
      } catch (error) {
        console.error("An error occurred:", error)
      } finally {
        setLoading4(false)
      }
    } else {
      alert.success("Please Login First!")
      open()
    }
  }

  const removeToWishlistHandler = async () => {
    try {
      const wishlistItem = wishlist.filter(
        (item) =>
          item[1].product_slug === product.slug &&
          item[1].principal.toText() === principal,
      )
      //console.log(wishlistItem[0][1].id)
      setLoading4(true)
      const res = await backend.deleteWishlistItems(wishlistItem[0][1].id)
      console.log(res)
      if ("ok" in res) {
        alert.success("The product has been removed to your wishlist.")
        listWishlists()
        //window.location.reload()
      }
    } catch (error) {
      console.error("An error occurred:", error)
    } finally {
      setLoading4(false) // Set loading to false when the update is complete (success or error)
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await backend.listProducts()
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [backend])

  const maxInitialDisplay = 4

  //console.log(filteredItem[1]?.product_slug)

  const images = [product?.img1, product?.img2, product?.img3]


  return (
    <>
      <div className="md:container md:mx-auto px-5 md:px-0 py-20">
        <div className="flex flex-wrap md:flex-nowrap gap-10 w-full mb-20">
          <div className="w-full md:w-1/3 flex flex-col gap-5">
            <div className="w-full relative">
              <img
                src={
                  images[selectedImage] ? images[selectedImage] : placeholderImg
                }
                alt={`Product ${selectedImage + 1}`}
                className="w-full"
              />

              {loading ? (
                <div className="w-[80px] h-[25px] rounded-xl bg-gray-200 animate-pulse absolute top-5 left-5 "></div>
              ) : (
                <h6 className="absolute top-5 left-5 text-xs uppercase bg-gray-200 px-2 py-1 font-light rounded-3xl absolute top-2 left-2">
                  {product?.category}
                </h6>
              )}
              {loading ? (
                <div className="w-[40px] h-[40px] rounded-full bg-gray-200 animate-pulse mb-5 absolute top-5 right-5 "></div>
              ) : (
                <button
                  onClick={() => {
                    isProductInLocalWishlist
                      ? removeToWishlistHandler()
                      : addToWishlistHandler(product)
                  }}
                  className={`absolute top-5 right-5 bg-white p-2 rounded-full shadow-sm w-[40px] h-[40px] ${
                    loading4 && "opacity-50"
                  }`}
                  disabled={loading4 && true}
                >
                  {loading4 ? (
                    <TailSpin
                      height="100%"
                      width="100%"
                      color="black"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      visible={true}
                    />
                  ) : (
                    <>
                      {isProductInLocalWishlist ? (
                        <IoHeart className="text-[#D02F2F]" size="1.5em" />
                      ) : (
                        <IoHeartOutline size="1.5em" />
                      )}
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 justify-between items-center gap-5">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image ? image : placeholderImg}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                  className={
                    index === selectedImage ? "border-2 p-1 w-full" : ""
                  }
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex flex-col justify-start items-start">
              {loading ? (
                <div className="w-[250px] h-[35px] rounded-xl bg-gray-100 animate-pulse mb-3"></div>
              ) : (
                <h1 className="text-3xl text-black font-semibold uppercase mb-3">
                  {product?.title}
                </h1>
              )}

              {loading ? (
                <div className="w-[150px] h-[25px] rounded-xl bg-gray-100 animate-pulse mb-5"></div>
              ) : (
                <h1 className="text-xl text-black mb-5 flex gap-3">
                  {" "}
                  {/*                 <span className="font-medium">Price : </span>
                   */}{" "}
                  <span className="font-black tracking-widest flex items-center gap-1">
                    <SiInternetcomputer className="w-6 h-6" />{" "}
                    {product?.price?.toFixed(2)}
                    {/* &nbsp;<span className="font-medium text-sm">($16.16)</span> */}
                  </span>
                </h1>
              )}

              {loading ? (
                <div className="mb-6">
                  <div className="w-[250px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-2"></div>
                  <div className="w-[200px] h-[15px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
                  <div className="w-[150px] h-[15px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
                  <div className="w-[170px] h-[15px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
                  <div className="w-[150px] h-[15px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
                  <div className="w-[130px] h-[15px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
                </div>
              ) : (
                <div className="mb-6">
                  <h1 className="text-lg text-black font-light uppercase mb-1">
                    About this item
                  </h1>
                  <p className="text-sm text-gray-500 font-normal mb-1">
                    {showFullText
                      ? product?.description
                      : product?.description?.slice(0, maxLength)}
                  </p>
                  {product?.description?.length > maxLength && (
                    <button
                      onClick={toggleShowMore}
                      className="text-sm underline text-gray-500"
                    >
                      {showFullText ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              )}

              {loading ? (
                <div className="w-[200px] h-[50px] rounded-none bg-gray-100 animate-pulse mb-2"></div>
              ) : (
                <>
                  {isProductInLocalCart ? (
                    <Link
                      to="/cart"
                      className={`flex items-center gap-3 bg-[#D02F2F] hover:bg-black py-2 px-8 font-medium text-lg uppercase text-white hover:text-white tracking-widest transition-all ease-in-out duration-300`}
                    >
                      Go to cart
                    </Link>
                  ) : (
                    <button
                      onClick={() => addToCartHandler(product)}
                      className={`flex items-center gap-3 bg-[#D02F2F] hover:bg-black py-2 px-8 font-medium text-lg uppercase text-white hover:text-white tracking-widest transition-all ease-in-out duration-300 ${
                        loading2 && "opacity-50 hover:!bg-[#D02F2F]"} ${product?.inventory <= 0 && "opacity-50 hover:!bg-[#D02F2F]"}`}
                      disabled={loading2 && true || product?.inventory <= 0}
                    >
                      {loading2 ? (
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
                      )}{" "}
                      {product?.inventory <= 0 ? 'Out of stock' : 'Add to cart'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black w-full py-10">
        <div className="md:container md:mx-auto px-5 md:px-0">
          <h1 className="mb-6 text-white font-semibold tracking-wider text-3xl uppercase">Other Items You Might Want To Grab</h1>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {products.slice(0, maxInitialDisplay).map((product) => (
                  <ProductCard key={product[1].id} product={product[1]} />
                ))}
              </div>
            ) : (
              <NoDataFound title={"No Product Found"} />
            )}
        </div>
      </div>
    </>
  )
}

export default ProductDetails
