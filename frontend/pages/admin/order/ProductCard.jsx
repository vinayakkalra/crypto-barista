import React from "react";
import { Link } from "react-router-dom";
import placeholderImg from "../../../assets/placeholderImg.png";
import { SiInternetcomputer } from "react-icons/si";

const ProductCard = ({ loading, product }) => {
  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-4 bg-white rounded-none">
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
        <div className="w-4.5/5">
          <h6 className="text-xl uppercase text-black font-semibold line-clamp-2 leading-tight mb-1">
            {loading ? (
              <div className="w-[200px] h-[25px] rounded-xl bg-gray-100 animate-pulse"></div>
            ) : (
              product?.title
            )}
          </h6>
          <h6 className="text-xs  text-black font-semibold line-clamp-2 leading-tight">
            {loading ? (
              <div className="flex flex-cols  gap-1">
                <div className="w-[250px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
                <div className="w-[250px] h-[20px] rounded-xl bg-gray-100 animate-pulse"></div>
              </div>
            ) : (
              product?.description
            )}
          </h6>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/6">
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
              <span className="flex items-center gap-1">
                <SiInternetcomputer className="w-5 h-5" />{" "}
                {product?.price?.toFixed(2)}
              </span>
            )}
          </h6>
        </div>
        <div className="w-2/6">
          {loading ? (
            <div className="w-[80px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
          ) : (
            <h6 className="text-xs uppercase text-black font-light mb-0">
              QTY
            </h6>
          )}
          {loading ? (
            <div className="w-[100px] h-[25px] rounded-xl bg-gray-100 animate-pulse "></div>
          ) : (
            <div className="flex justify-start items-center gap-2">
              <h6 className="text-xl text-black font-semibold tracking-widest">
                {product?.quantity}
              </h6>
            </div>
          )}
        </div>
        <div className="w-1/6 flex justify-between items-center">
          <div>
            <h6 className="text-xs uppercase text-black font-light mb-0">
              {loading ? (
                <div className="w-[80px] h-[20px] rounded-xl bg-gray-100 animate-pulse mb-1"></div>
              ) : (
                "Total"
              )}
            </h6>

            <h6 className="text-xl text-black font-semibold tracking-widest">
              {loading ? (
                <div className="w-[100px] h-[25px] rounded-xl bg-gray-100 animate-pulse"></div>
              ) : (
                <span className="flex items-center gap-1">
                  <SiInternetcomputer className="w-5 h-5" />{" "}
                  {(product?.price * product?.quantity).toFixed(2)}{" "}
                </span>
              )}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
