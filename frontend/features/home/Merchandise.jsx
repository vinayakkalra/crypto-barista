import React, { useState, useEffect } from "react";
import { useCanister } from "@connect2ic/react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllProductsAsync, fetchCategoriesAsync } from "../product/productSlice";
import NoDataFound from "../common/empty/NoDataFound";

const Merchandise = () => {
  const [products, setProducts] = useState([]);
  const [backend] = useCanister("backend");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await backend.listProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [backend]);




  const maxInitialDisplay = 8;

  return (
    <div className={`w-full relative overflow-hidden bg-white dark:bg-[#0e0702]`}>
      <h1 className="text-9xl md:text-9xl text-gray-200/20 dark:text-white/10 uppercase tracking-[10px] font-black absolute -top-2.5 md:-top-5 -right-2 z-0" style={{ fontSize: '10rem'}}>
        coffee
      </h1>
      <div className="px-5 py-10">
        <div className="md:container md:mx-auto h-full">
          <div className="flex flex-col justify-start">
            <h2 className="text-6xl md:text-8xl font-bold text-black dark:text-white mb-6">
            <span className="font-thin">EXCLUSIVE</span> <br />
              TREASURES
            </h2>
            {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
              {products.slice(0, maxInitialDisplay).map((product) => (
                <ProductCard key={product[1].id} product={product[1]} />
              ))}
            </div>
            ):(
              <NoDataFound title={'No Product Found'}/>
            )}
            {products.length > maxInitialDisplay && (
              <div className="flex justify-center mb-8">
                <Link
                  to="/merchandise"
                  className="uppercase bg-transparent border-2 border-black dark:border-white text-black dark:text-white text-xl tracking-wide py-2 px-8 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all ease-in-out duration-300"
                >
                  SHOW ME MORE!
                </Link>
                
              </div>
            )}
            {/* <button onClick={dddd}
                  className="uppercase bg-transparent border-2 border-black dark:border-white text-black dark:text-white text-xl tracking-wide py-2 px-8 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all ease-in-out duration-300"
                >
                  SHOW ME MORE!
                </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
