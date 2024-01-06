import {
  useCanister,
  useConnect,
  useTransfer,
  useWallet,
} from "@connect2ic/react"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Country, State, City } from "country-state-city"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

const ShippingAddress = () => {
  const [countries, setCountries] = useState([])
  const [countryId, setCountryId] = useState("")
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState("")
  const [cities, setCities] = useState([])
  const [backend] = useCanister("backend")
  const { principal } = useConnect()
  const [carts, setCarts] = useState([])
  const [loading, setLoading] = useState(true)
  const [subTotalAmount, setSubTotalAmount] = useState(0)
  const [products, setProducts] = useState([])
  const shippingAmount = 5
  const netAmount = shippingAmount + subTotalAmount;

  const navigate = useNavigate()
  useEffect(() => {
    const countryData = Country.getAllCountries()
    setCountries(countryData)
  }, [])
 // console.log(countries)

  const handleCountry = (e) => {
    const selectedCountryId = e.target.value
    setCountryId(selectedCountryId)

    const selectedStates = State.getStatesOfCountry(selectedCountryId)
    setStates(selectedStates)

    setSelectedState("")
    setCities([])
  }

  const handleState = (e) => {
    const selectedStateName = e.target.value
    setSelectedState(selectedStateName)

    const selectedCities = City.getCitiesOfState(countryId, selectedStateName)
    setCities(selectedCities)
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  })
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    const listCarts = async () => {
      try {
        // setLoading(true); // Remove this line if not needed

        const cart = await backend.listCartItems();
        setCarts(cart);
      } catch (error) {
        console.error("Error listing carts:", error);
        // Handle the error, show a message to the user, etc.
      } finally {
        // setLoading(false); // Remove this line if not needed
      }
    };

    listCarts();
  }, [backend]);

  const filterItems = carts?.filter(
    (item) => item[1]?.principal.toText() === principal,
  )

  console.log(filterItems, 'filterItems')

  useEffect(() => {
    const listProducts = async () => {
      try {
        const product = await backend.listProducts();
        setProducts(product);
      } catch (error) {
        console.error("Error listing products or categories:", error);
      }
    };

    listProducts();
  }, [backend]);

  useEffect(() => {
    if (!filterItems || !products) return // Skip calculation if either is undefined
    const totalAmount = filterItems?.reduce(
      (accumulatedAmount, currentItem) => {
        const product = products?.find(
          (product) => product[1]?.slug === currentItem[1]?.product_slug,
        )
        if (!product || typeof product[1] === "undefined") {
          return accumulatedAmount // Skip this iteration if product or product[1] is undefined
        }
        const price = product[1]?.price || 0
        const qty = Number(currentItem[1]?.qty) || 0
        return accumulatedAmount + price * qty
      },
      0,
    )
    setSubTotalAmount(totalAmount)
  }, [filterItems, products])

  
    const cartOrderData = {
      shippingAddress: {
        mail: formData.email || "",
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        street: formData.streetAddress || "",
        postCode: formData.pincode || "",
        country: formData.country || "",
        city: formData.city || "",
        mobile: formData.mobileNumber || ""
      },
      products: [...filterItems].map((item) => ({
        id: item[1].product_slug,
        quantity: Number(item[1].qty)
      })),
      totalAmount: parseFloat(subTotalAmount + shippingAmount),
    shippingAmount: parseFloat(shippingAmount),
    netAmount: parseFloat(netAmount),
    paymentAddress: '12345',
    };

    console.log(cartOrderData, 'cartOrderData')

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can proceed with submission or other actions
      console.log("Form submitted:", formData)
      console.log(cartOrderData, 'cartOrderData')


    } else {
      // Form has errors, update the state to display error messages
      setErrors(validationErrors)
    }
  }

  const validateForm = (data) => {
    let errors = {}

    // Example validation, you can add more conditions based on your requirements
    if (!data.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    // Add more validation for other fields

    return errors
  }

  return (
    <div className="md:container md:mx-auto px-5 md:px-0 py-20">
      <div className="w-full">
        <div className="w-full relative flex justify-center items-center mb-20">
          <div className="border-2 w-3/4"></div>
          <div className="flex justify-between items-center absolute w-3/4">
            <Link
              to="/cart"
              className="bg-[#ffa07e] p-1 rounded-full w-10 h-10 flex justify-center items-center text-white text-lg font-semibold "
            >
              1
            </Link>
            <Link
              to="/checkout"
              className="bg-[#d02f2f] p-1 rounded-full w-10 h-10 flex justify-center items-center text-white text-lg font-semibold "
            >
              2
            </Link>
            <Link
              to="/cart"
              className="bg-[#ffa07e] p-1 rounded-full w-10 h-10 flex justify-center items-center text-white text-lg font-semibold "
            >
              3
            </Link>
          </div>
        </div>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="dark:text-white md:container w-fll"
      >
        <div className="md:flex flex-col md:flex-row  ">
          <div className="flex flex-col w-full p-2  dark:text-white">
            <label htmlFor="" className="ml-1">
              First name <span>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Your first name"
              className="border p-2 outline-none border-[#2A353D]"
            />
          </div>
          <div className="flex flex-col w-full p-2">
            <label htmlFor="" className="ml-1">
              Last name <span>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Your Last name"
              className="border p-2 border-[#2A353D]  outline-none "
            />
          </div>
        </div>
        <div className="md:flex flex-col md:flex-row">
          <div className="flex flex-col w-full  p-2 ">
            <label htmlFor="" className="ml-1">
              Email address <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Last name"
              className="border p-2 border-[#2A353D]  outline-none "
            />
          </div>
          <div className="flex flex-col w-full p-2">
            <label htmlFor="" className="ml-1">
              Mobile number <span>*</span>
            </label>
            <div className="w-full border border-[#2A353D]">
              <select
                className=" p-2 dark:text-black w-1/6 outline-none "
                name=""
                id=""
                onChange={(e) => handleCountry(e)}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.flag} {country.phonecode}
                  </option>
                ))}
              </select>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Your Last name"
                className="border w-5/6 p-2 border-[#2A353D]  outline-none "
              />
            </div>
          </div>
        </div>
        <div className="md:flex flex-col md:flex-row">
          <div className="flex flex-col w-full  p-2 ">
            <label htmlFor="" className="ml-1">
              Street address <span>*</span>
            </label>
            <input
              type="name"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="Your Last name"
              className="border p-2 border-[#2A353D]  outline-none "
            />
          </div>
        </div>
        <div className="md:flex flex-col md:flex-row">
          <div className="flex flex-col w-full  p-2 ">
            <label htmlFor="" className="ml-1">
              Country<span>*</span>
            </label>
            {/* <input
                type="text"
                placeholder="Start typing the name of your country"
                className="border p-2  border-[#2A353D]"
              /> */}
            <select
              name="country"
              id="country"
              value={formData.country}
              className="border p-2 dark:text-black border-[#2A353D] outline-none"
              onChange={(e) => handleCountry(e)}
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full p-2">
            <label htmlFor="" className="ml-1">
              State / Province / Region <span>*</span>
            </label>
            {/* <input
                type="text"
                placeholder="Type in your state/region/province if necessary"
                className="border p-2  border-[#2A353D]"
              /> */}

            <select
              className="border p-2 dark:text-black outline-none border-[#2A353D]"
              name="state"
              id="state"
              value={formData.state}
              onChange={(e) => handleState(e)}
            >
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state.id} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:flex flex-col md:flex-row">
          <div className="flex flex-col w-full  p-2 ">
            <label htmlFor="" className="ml-1">
              City <span>*</span>
            </label>
            {/* <input
                type="text"
                placeholder="Type in your city"
                className="border p-2 border-[#2A353D]"
              /> */}
            <select
              className="border p-2 dark:text-black outline-none    border-[#2A353D]"
              name="city"
              id="city"
              onChange={handleChange}
              value={formData.city}
            >
              <option className="w-full overflow-hidden" value="">
                Select city
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full p-2">
            <label htmlFor="" className="ml-1">
              Pincode <span>*</span>
            </label>
            <input
              name="pincode"
              id="pincode"
              value={formData.pincode}
              onChange={handleChange}
              type="text"
              className="border p-2 outline-none  border-[#2A353D]"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 w-full mt-12">
          <Link
            to="/cart"
            className="flex gap-2 justify-center items-center uppercase text-md font-medium tracking-widest text-white bg-black px-6 py-2 hover:bg-[#D02F2F] transition-all ease-in-out duration-300"
          >
            <BsArrowLeft className="w-6 h-6" /> Back to cart
          </Link>
          <button
            className="flex gap-2 justify-center items-center uppercase text-md font-medium tracking-widest text-white bg-[#D02F2F] px-6 py-2 hover:bg-black transition-all ease-in-out duration-300"
          >
            CONTINUE TO PAY <BsArrowRight className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShippingAddress
