import React, { useEffect, useState } from "react"
import merchandise1 from "../../assets/merchandise1.png"
import { useCanister } from "@connect2ic/react"
import { Link } from "react-router-dom"
import NoDataFound from "../common/empty/NoDataFound"
import placeholderImg from "../../assets/placeholderImg.png"
import { InfinitySpin } from "react-loader-spinner"
import { SiInternetcomputer } from "react-icons/si"

const Collections = () => {
  const [product, setProduct] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [backend] = useCanister("backend")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const listProductsAndCategories = async () => {
      try {
        setLoading(true)

        const products = await backend.listProducts()
        setProduct(products)

        const categories = await backend.listCategories()
        setCategories(categories)
        console.log(categories)
      } catch (error) {
        console.error("Error listing products or categories:", error)
      } finally {
        setLoading(false)
      }
    }

    listProductsAndCategories()
  }, [backend])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const filteredProducts = product.filter(
    (item) =>
      (selectedCategory === "" || item[1].category === selectedCategory) &&
      item[1].title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryCount = (categoryName) => {
    return product.filter((item) => item[1].category === categoryName).length
  }
  const totalProductCount = product.length
  return (
    <div>
      {/*collection section*/}
      <div className="md:container  md:mx-auto p-5 ">
        {/*new */}
        <h1 className="font-bold font-sans text-4xl sm:text-5xl mb-3 sm:mb-6 mt-20 text-center sm:text-left dark:text-white">
          COLLECTION
        </h1>
        <h2 className="text-2xl font-light sm:text-3xl mb-3 sm:mb-6 text-center sm:text-left dark:text-white">
          LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING
          INDUSTRY.
        </h2>
        <p className="text-base font-light sm:text-lg lg:text-xl mb-10 text-center sm:text-left dark:text-white">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknow printer took a gallery of type and
          scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="md:container md:mx-auto p-5  mb-20">
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
          <div className="sm:flex">
            {/* FILTER BY CATEGORIES section */}

            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <input
                type="text"
                placeholder="Search by product..."
                className="w-full px-4 py-2 border  rounded-full bg-gray-200 mb-4 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <h1 className="font-bold dark:text-white text-lg mb-4 md:mb-8">
                FILTER BY CATEGORIES
              </h1>
              <div className="mb-2">
                <button
                  className={`text-black-500 dark:text-white font-medium hover:underline relative ${
                    !selectedCategory && "underline"
                  }`}
                  onClick={() => handleCategoryClick("")}
                >
                  <span className="text-slate-500 rounded-full bg-gray-200 h-5 w-5 flex items-center justify-center absolute -right-10">
                    {totalProductCount}
                  </span>
                  SHOW ALL
                </button>
              </div>
              {categories.map((category) => (
                <CategoryButton
                  category={category[0]}
                  selectedCategory={selectedCategory}
                  handleCategoryClick={handleCategoryClick}
                  getCategoryCount={getCategoryCount}
                />
              ))}
              {/* <div className="mb-2">
                <button
                  className={`flex w-full dark:text-white  justify-between  cursor-pointer ${
                    selectedCategory === "hoodies" && "underline"
                  }`}
                  onClick={() => handleCategoryClick("hoodies")}
                >
                  <p> HOODIES</p>
                  <span className="text-slate-500 pr-12 h-5 w-5 flex items-center   dark:text-white">
                    {getCategoryCount("hoodies")}
                  </span>
                </button>
              </div> */}

              {/* <div className="mb-2">
                <button
                  className={`flex w-full dark:text-white  justify-between  cursor-pointer ${
                    selectedCategory === "paints" && "underline"
                  }`}
                  onClick={() => handleCategoryClick("paints")}
                >
                  <p> PAINTS</p>
                  <span className="text-slate-500 pr-12 h-5 w-5 flex items-center   dark:text-white">
                    {getCategoryCount("paints")}
                  </span>
                </button>
              </div> */}
            </div>

            {/* Merchandise items */}
            <div className="w-full sm:w-1/2 md:w-2/3 lg:w-3/4 h-screen overflow-y-auto p-5">
              {filteredProducts.length > 0 ? (
                <div className="w-full grid grid-cols-1 wrap scroll sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {/* Add merchandise items here */}
                  {filteredProducts.map((item) => (
                    <MerchandiseItem
                      key={item[1].id}
                      img1={item[1].img1}
                      name={item[1].title}
                      price={item[1].price}
                      category={item[1].category}
                      slug={item[1].slug}
                    />
                  ))}
                </div>
              ) : (
                <NoDataFound title={"No Product Found"} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections

const MerchandiseItem = ({ img1, name, price, category, slug }) => {
  return (
    <div className="bg-white dark:bg-[#180D05] shadow-lg rounded-xl w-full relative overflow-hidden">
      <div className="w-full rounded-t-xl img-hover-zoom">
        <img
          src={img1 ? img1 : placeholderImg}
          alt={name}
          className="rounded-t-xl w-full "
        />
      </div>
      <h6 className="text-xs uppercase bg-gray-200 px-2 py-1 font-light rounded-3xl absolute top-2 left-2">
        {category}
      </h6>
      <div className="p-4">
        <div className="flex flex-col justify-center items-center md:justify-start md:items-start gap-0 mb-2">
          <h6 className="text-black dark:text-white font-semibold text-xl line-clamp-2 ">
            {name}
          </h6>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <h6 className="text-black dark:text-white font-light text-xl">
            <span className="font-black tracking-widest flex items-center gap-1">
              <SiInternetcomputer className="w-6 h-6" /> {price.toFixed(2)}
              {/* &nbsp;<span className="font-medium text-sm">($16.16)</span> */}
            </span>
          </h6>
          <Link
            to={`/product/${slug}`}
            className="uppercase bg-[#D02D2D] text-white text-lg tracking-wide py-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300"
          >
            Grab this
          </Link>
        </div>
      </div>
    </div>
  )
}

const CategoryButton = ({
  category,
  selectedCategory,
  handleCategoryClick,
  getCategoryCount,
}) => {
  const categoryName = typeof category === "object" ? category.name : category

  return (
    <div className="mb-2">
      <button
        className={`flex w-full dark:text-white  justify-between  cursor-pointer ${
          selectedCategory === categoryName && "underline"
        }`}
        onClick={() => handleCategoryClick(categoryName)}
      >
        <p>{categoryName.toUpperCase()}</p>
        <span className="text-slate-500 pr-12 h-5 w-5 flex items-center dark:text-white">
          {getCategoryCount(categoryName)}
        </span>
      </button>
    </div>
  )
}
