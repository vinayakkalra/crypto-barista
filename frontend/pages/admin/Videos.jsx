import React, { useState, useEffect, useMemo } from "react";
import Table, {
  DetailButton,
  SelectColumnFilter,
  StatusActive,
  StatusPill,
} from "./utils/Table";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { InfinitySpin } from "react-loader-spinner";
import { useCanister } from "@connect2ic/react";
const Videos = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },

      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter, // new
        Cell: StatusPill,
      },
      {
        Header: "Course",
        accessor: "course",
      },

      {
        Header: "Detail",
        accessor: "slug",
        Cell: DetailButton,
      },
    ],
    []
  );
  const [backend] = useCanister("backend");
  const [Videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    listAllVideos();
  }, []);

  const listAllVideos = async () => {
    try {
      setLoading(true);
      const video = await backend.listVideos();
      setVideos(video);
    } catch (error) {
      console.error("Error listing all category:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = useMemo(() => Videos, [Videos]);
  // Get data from the second element of each sub-array
  const extractedData = data.map(([key, data]) => data);
  console.log(extractedData);

  return (
    <div className="styled-scrollbar  flex flex-col bg-white dark:bg-slate-800 rounded-2xl h-[calc(100vh-100px)] p-4">
      <div className="">
        <div className="mb-5 flex justify-between">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Videos
          </h1>
          <div>
            <Link
              to="/admin/videos/add-video"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3"
            >
              <CiCirclePlus className="w-5 h-5" /> NEW VIDEO
            </Link>
          </div>
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

export default Videos;
