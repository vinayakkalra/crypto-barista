import React from "react"
import THUMBNAIL from "../../assets/thumbnail.png"
import { Link } from "react-router-dom"
import moment from "moment";

const VideoCard = ({data}) => {

    const getDate = (timestamp) => {
        const converted = Number(timestamp) / 1000000;
        const date = new Date(converted);
        return `${date}`;
    };
  return (
    <div className="w-full">
      <Link to={`/video/${data[1].slug}`}>
        <img src={data[1].img1 ? data[1].img1 : THUMBNAIL} className="w-full mb-3" />
      </Link>
      <Link to={`/video/${data[1].slug}`}>
        <h1 className="text-lg font-semibold line-clamp-2 leading-none text-black mb-1">
            {data[1].title}
        </h1>
      </Link>
      <h1 className="text-sm font-medium text-gray-500">{moment(getDate(data[1].time_created)).fromNow()}</h1>
    </div>
  )
}

export default VideoCard
