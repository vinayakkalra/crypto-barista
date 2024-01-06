import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusActive,
  StatusOrder,
  StatusPayment,
  StatusPill,
} from "./utils/Table"; // Update the import
import item1 from "../../assets/merchandise1.png";
import { useCanister } from "@connect2ic/react";
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";

const Order = () => {
  const [backend] = useCanister("backend");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = React.useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "userId",
      },
      {
        Header: "payment Address",
        accessor: "paymentAddress",
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        Cell: StatusPayment,
      },
      {
        Header: "order status",
        accessor: "orderStatus",
        Filter: SelectColumnFilter, // new
        Cell: StatusOrder,
      },
      {
        Header: "Detail",
        accessor: "id",
        Cell: DetailButton,
      },
    ],
    []
  );
  useEffect(() => {
    listAllOrders();
  }, []);

  const listAllOrders = async () => {
    try {
      const items = await backend.listOrders();
      setOrders(items);
    } catch (error) {
      console.error("Error listing all Orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = useMemo(() => orders, [orders]);
  // Get data from the second element of each sub-array
  const extractedData = data.map(([key, data]) => data);
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white dark:bg-slate-800 rounded-2xl h-[calc(100vh-100px)] p-4">
      <div className="">
        <div className="mb-6 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Orders
          </h1>
        </div>
        <div className="w-full">
          {loading ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <InfinitySpin
                width="200"
                color="black"
                ariaLabel="tail-spin-loading"
                visible={true}
              />
            </div>
          ) : (
            <Table columns={columns} data={extractedData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
