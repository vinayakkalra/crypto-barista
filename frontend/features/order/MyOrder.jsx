import { useCanister, useConnect } from "@connect2ic/react"
import React, { useEffect, useState } from "react"
import NoDataFound from "../common/empty/NoDataFound"
import { InfinitySpin } from "react-loader-spinner"
import OrderCard from "./OrderCard"

const MyOrder = () => {
  const [backend] = useCanister("backend")
  const { principal } = useConnect()
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(true)

  const getDate = (timestamp) => {
    const converted = Number(timestamp) / 1000000;
    const date = new Date(converted);
    return `${date}`;
};

  useEffect(() => {
    const listOrders = async () => {
      try {
        setLoading(true)

        const items = await backend.listOrders()
        setOrder(items)
        //console.log(cart)
      } catch (error) {
        console.error("Error listing carts:", error)
      } finally {
        setLoading(false)
      }
    }

    listOrders()
  }, [backend])

  const filterItems = order.filter(
    (item) => item[1].userId === principal,
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
            Recent orders
          </h1>
          <div className="w-full mb-20">
            {filterItems.length > 0 ? (
              <>
                {filterItems.map((item, index) => (
                  <OrderCard
                    key={index}
                    order={item}
                    setOrder={setOrder}
                    loading={loading}
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

export default MyOrder
