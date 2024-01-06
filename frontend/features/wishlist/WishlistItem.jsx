import { useCanister, useConnect } from "@connect2ic/react"
import React, { useEffect, useState } from "react"
import NoDataFound from "../common/empty/NoDataFound"
import WishlistItemCard from "./WishlistItemCard"
import { InfinitySpin } from "react-loader-spinner"

const WishlistItem = () => {
  const [backend] = useCanister("backend")
  const { principal } = useConnect()
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const listWishlists = async () => {
      try {
        setLoading(true)

        const items = await backend.listWishlistItems()
        setWishlist(items)
        //console.log(cart)
      } catch (error) {
        console.error("Error listing carts:", error)
      } finally {
        setLoading(false)
      }
    }

    listWishlists()
  }, [backend])

  const filterItems = wishlist.filter(
    (item) => item[1].principal.toText() === principal,
  )

  return (
    <div className="md:container md:mx-auto px-5 md:px-0 py-20">
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
        <>
          <h1 className="text-2xl uppercase tracking-wider font-semibold mb-8">
            ITEMS I LOVE
          </h1>
          <div className="w-full mb-20">
            {filterItems.length > 0 ? (
              <>
                {filterItems.map((item, index) => (
                  <WishlistItemCard
                    key={index}
                    wishlist={item}
                    setWishlist={setWishlist}
                  />
                ))}
              </>
            ) : (
              <NoDataFound title={"Items Not Found"} />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default WishlistItem
