import React from "react";
import { Link } from "react-router-dom";
import placeholderImg from "../../assets/placeholderImg.png"; 
import { SiInternetcomputer } from "react-icons/si";

const ProductCard = ({ product }) => {
  const { img1, title, price, category, slug } = product;

  return (
    <div className="bg-white dark:bg-[#180D05] shadow-lg rounded-xl w-full relative overflow-hidden">
      <div className="w-full rounded-t-xl img-hover-zoom">
        <img src={img1 ? img1 : placeholderImg} alt={title} className="rounded-t-xl w-full " />
      </div>
      <h6 className="text-xs uppercase bg-gray-200 px-2 py-1 font-light rounded-3xl absolute top-2 left-2">
        {category}
      </h6>
      <div className="p-4">
        <div className="flex flex-col justify-center items-center md:justify-start md:items-start gap-0 mb-2">
          <h6 className="text-black dark:text-white font-semibold text-xl line-clamp-2">
            {title} 
          </h6>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <h6 className="text-black dark:text-white font-light text-xl">
          <span className="font-black tracking-widest flex items-center gap-1">
                    <SiInternetcomputer className="w-6 h-6" />{" "}
                    {price.toFixed(2)}
                    {/* &nbsp;<span className="font-medium text-sm">($16.16)</span> */}
                  </span>
          </h6>
          <Link
            to={`/product/${slug}`}
            className=" uppercase bg-[#D02D2D] text-white text-lg tracking-wide py-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300"
          >
            Grab this
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
