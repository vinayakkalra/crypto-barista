import {
  useBalance,
  useCanister,
  useConnect,
  useTransfer,
  useWallet,
} from "@connect2ic/react";
import React, { useEffect, useState, useCallback } from "react";
import { useAlert } from "react-alert";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import NoDataFound from "../common/empty/NoDataFound";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import emailjs from '@emailjs/browser';


const pMethod = [
  {
    name: "Plug Wallet",
    value: "plug-wallet",
  },
  /* {
    name: "Fiat Payment",
    value: "fiat-payment",
  }, */
  {
    name: "Paypal Payment",
    value: "paypal-payment",
  },
];

const style = {
  layout: "vertical",
  color: "black",
  shape: "rect",
  label: "pay",
};

const ShippingAddress = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const [wallet] = useWallet();
  const [assets] = useBalance();
  const [backend] = useCanister("backend");
  const { principal } = useConnect();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(pMethod[0].value);
  const [paymentId, setPaymentId] = useState("");
  const [totalAmountInTargetCurrency, setTotalAmountInTargetCurrency] =
    useState(0);
  const shippingAmount = 1;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  });

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=48a7b735b1d34a2887ece0955bb98de2" // Replace USD with your base currency
      );

      const exchangeRate = response.data.rates.ICP; // Replace ICP with your target currency

      return exchangeRate;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return 1; // Return a default value (1) in case of an error
    }
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      alert.error("Please enter first name");
      return false;
    }
    if (!formData.lastName.trim()) {
      alert.error("Please enter last name");
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert.error("Please enter a valid email address");
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      alert.error("Please enter mobile number");
      return false;
    }
    if (!formData.streetAddress.trim()) {
      alert.error("Please enter street address");
      return false;
    }
    if (!formData.country.trim()) {
      alert.error("Please enter country");
      return false;
    }
    if (!formData.state.trim()) {
      alert.error("Please enter state");
      return false;
    }
    if (!formData.city.trim()) {
      alert.error("Please enter city");
      return false;
    }
    if (!formData.pinCode.trim()) {
      alert.error("Please enter pin code");
      return false;
    }
    if (!selected.trim()) {
      alert.error("Please Select Payment Method");
      return false;
    }
    return true;
  };

  const validateForm2 = () => {
    if (!formData.firstName.trim()) {
      //alert.error("Please enter first name")
      return false;
    }
    if (!formData.lastName.trim()) {
      //alert.error("Please enter last name")
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      //alert.error("Please enter a valid email address")
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      //alert.error("Please enter mobile number")
      return false;
    }
    if (!formData.streetAddress.trim()) {
      //alert.error("Please enter street address")
      return false;
    }
    if (!formData.country.trim()) {
      //alert.error("Please enter country")
      return false;
    }
    if (!formData.state.trim()) {
      //alert.error("Please enter state")
      return false;
    }
    if (!formData.city.trim()) {
      //alert.error("Please enter city")
      return false;
    }
    if (!formData.pinCode.trim()) {
      //alert.error("Please enter pin code")
      return false;
    }
    /* if (!selected.trim()) {
      //alert.error("Please Select Payment Method")
      return false
    } */
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    (item) => item[1]?.principal.toText() === principal
  );

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
    if (!filterItems || !products) return; // Skip calculation if either is undefined
    const subTotalAmt = filterItems.reduce((accumulatedAmount, currentItem) => {
      const product = products.find(
        (product) => product[1].slug === currentItem[1].product_slug
      );
      if (!product || typeof product[1] === "undefined") {
        return accumulatedAmount; // Skip this iteration if product or product[1] is undefined
      }
      const price = product[1].price || 0;
      const qty = Number(currentItem[1].qty) || 0;
      return accumulatedAmount + price * qty;
    }, 0);

    if (subTotalAmt !== subTotalAmount) {
      setSubTotalAmount(subTotalAmt);
    }
  }, [filterItems, products, subTotalAmount, setSubTotalAmount]);

  const cartOrderData = {
    shippingAmount: Number(shippingAmount),
    userId: principal,
    paymentAddress: paymentId,
    paymentMethod: selected,
    orderStatus: "processing",
    paymentStatus: "success",
    awb: "",
    totalAmount: Number(subTotalAmount + shippingAmount),
    shippingAddress: {
      mail: formData.email || "",
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      street: formData.streetAddress || "",
      postCode: formData.pinCode || "",
      country: formData.country || "",
      city: formData.city || "",
      state: formData.state || "",
      mobile: formData.mobileNumber || "",
    },
    products: (filterItems || [])
      .map((item) => {
        const product = products?.find(
          (product) => product[1]?.slug === item[1]?.product_slug
        );
        if (!product || typeof product[1] === "undefined") {
          return null; // Skip this iteration if product or product[1] is undefined
        }
        return {
          id: Number(product[1]?.id) || 0,
          title: product[1]?.title || "",
          img1: product[1]?.img1 || "",
          description: product[1]?.description || "",
          price: product[1]?.price || 0,
          slug: item[1].product_slug,
          quantity: Number(item[1].qty),
        };
      })
      .filter(Boolean), // Remove null values from the array
    subTotalAmount: Number(subTotalAmount),
  };

  const [transfer] = useTransfer({
    //to: "",
    to: "",
    //amount: totalAmountInTargetCurrency,
    amount: 0.0001,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);

      if (selected === pMethod[0].value) {
        const exchangeRate = await fetchExchangeRate();
        setTotalAmountInTargetCurrency(
          (subTotalAmount + shippingAmount) * exchangeRate
        );
      } else if (selected === pMethod[1].value) {
        setTotalAmountInTargetCurrency(subTotalAmount + shippingAmount);
      }
      console.log(cartOrderData);

      //const { height } = await transfer();
      const height = "61345134";
      console.log(height);
      const pId = height.toString();

      // Corrected condition
      if (height !== "") {
        setPaymentId(pId); // Set paymentId before calling createOrder

        const res = await backend.createOrder({
          ...cartOrderData,
          paymentAddress: pId,
          totalAmount: Number(totalAmountInTargetCurrency),
        });

        console.log(res);

        const data = {
            to_name: res.ok.shippingAddress.firstName,
            to_email: res.ok.shippingAddress.mail,
            message: "Order Successfully"
        }

        if ("ok" in res) {
           // Send an email
          // Order successfully placed
          emailjs.send('service_3cstaqe', 'template_h193iwj', data, 'UFRBV9zB3pmPNstO5').then((result) => {console.log(result.text);}, (error) => {console.log(error.text);});

          alert.success("Order Successfully");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            streetAddress: "",
            country: "",
            state: "",
            city: "",
            pinCode: "",
          });
          setSelected(pMethod[0].value);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

 /*  const options2 = {
    key: "rzp_test_aYmN3URJ47pUQT",
    amount: (subTotalAmount + shippingAmount) * 100,
    currency: "USD",
    name: "Coffee Culture",
    description: "Test Transaction",
    image: "",
    //order_id: "12345",
    handler: async (res) => {
      console.log(res.razorpay_payment_id);
      setLoading(true);
      const res2 = await backend.createOrder({
        ...cartOrderData,
        paymentAddress: res.razorpay_payment_id,
        totalAmount: Number(subTotalAmount + shippingAmount),
      });

      console.log(res2);

      if ("ok" in res2) {
        alert.success("Order Successfully");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          streetAddress: "",
          country: "",
          state: "",
          city: "",
          pinCode: "",
        });
        setSelected(pMethod[0].value);
        navigate("/");
        setLoading(false);
      }
    },
    prefill: {
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      contact: formData.mobileNumber,
    },
    notes: {
      address: formData.streetAddress,
    },
    theme: {
      color: "#000000",
    },
  };

  const handlePayment = useCallback(async () => {
    //const order = await createOrder(param.slug);

    try {
      if (!validateForm()) {
        return;
      }
      setLoading(true);

      const rzpay = new Razorpay(options2);
      rzpay.open();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }

    //console.log(rzpay.razorpay_payment_id, 'razorpay_payment')
  }, [Razorpay, formData, totalAmountInTargetCurrency]); */

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = async (orderId) => {
    setPaidFor(true);
    // Assuming you have access to the createOrder function in your backend
    const res = await backend.createOrder({
      ...cartOrderData,
      paymentAddress: orderId,
      totalAmount: Number(subTotalAmount + shippingAmount),
    });

    console.log(res);
    const data = {
      to_name: res.ok.shippingAddress.firstName,
      to_email: res.ok.shippingAddress.mail,
      message: "Order Successfully"
  }

    if ("ok" in res) {
      alert.success("Order Successfully");
      emailjs.send('service_3cstaqe', 'template_h193iwj', data, 'UFRBV9zB3pmPNstO5').then((result) => {console.log(result.text);}, (error) => {console.log(error.text);});

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        streetAddress: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
      });
      setSelected(pMethod[0].value);
      navigate("/");
    }
  };

  // Trigger order creation when paidFor changes
  useEffect(() => {
    if (paidFor) {
      alert.success("Please Wait, Do not Refresh this page");
    }
  }, [paidFor]);

  if (error) {
    alert.error(error);
  }


/*   const sendMail = () => {
    const Data = {
      to_name: "Shubham",
      to_email: "workdotsg@gmail.com",
      message: "Order Successfully"
  }
    emailjs.send("service_3cstaqe", "template_h193iwj", Data, "UFRBV9zB3pmPNstO5").then((result) => {console.log(result.text);}, (error) => {console.log(error.text);});

  } */


  return (
    <div className="md:container md:mx-auto px-5 py-20">
      <div className="w-full">
        <div className="w-full relative flex justify-center items-center mb-20">
          <div className="border-2 w-1/2"></div>
          <div className="flex justify-between items-center absolute w-1/2">
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
            {/*  <Link
              to="/success"
              className="bg-[#ffa07e] p-1 rounded-full w-10 h-10 flex justify-center items-center text-white text-lg font-semibold "
            >
              3
            </Link> */}
          </div>
        </div>
      </div>
      {filterItems?.length > 0 ? (
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  Country
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  State/Province/Region
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  City
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="text-black text-sm font-semibold uppercase tracking-wider"
                >
                  Pin/Zip Code
                </label>
                <input
                  type="text"
                  className="border bg-transparent px-2 py-1.5 border-black w-full outline-none text-black"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="md:w-2/3 w-full">
                <RadioGroup value={selected} onChange={setSelected}>
                  <RadioGroup.Label className="text-black text-sm font-semibold uppercase tracking-wider">
                    Payment Method
                  </RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-4">
                    {pMethod.map((item) => (
                      <RadioGroup.Option
                        key={item.name}
                        value={item.value}
                        className={({ active, checked }) =>
                          `${active ? "" : ""}
                  ${checked ? "bg-black text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-none px-5 py-4 focus:outline-none uppercase border-[1px] border-black tracking-widest`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                      checked ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {item.name}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 text-white">
                                  <CheckIcon className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="md:w-1/3 w-full flex flex-col items-end justify-end">
                <h4 className="text-black text-sm font-semibold uppercase tracking-wider ">
                  Paying Amount
                </h4>
                <h4 className="text-4xl font-semibold py-2.5">
                  $ {(subTotalAmount + shippingAmount).toFixed(2)}
                </h4>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-between md:items-center gap-2 w-full mt-12">
              <Link
                to="/cart"
                className="flex gap-2 justify-center items-center uppercase text-md font-medium tracking-widest text-white bg-black px-6 py-2 hover:bg-[#D02F2F] transition-all ease-in-out duration-300"
              >
                <BsArrowLeft className="w-6 h-6" /> Back to cart
              </Link>
              {selected === pMethod[0].value ? (
                <button
                  disabled={loading}
                  type="submit"
                  className={`flex gap-2 justify-center items-center uppercase text-md font-medium tracking-widest text-white bg-[#D02F2F] px-6 py-2 hover:bg-black transition-all ease-in-out duration-300 ${
                    loading && "opacity-50 hover:!bg-[#D02F2F]"
                  }`}
                >
                  CONTINUE TO PAY{" "}
                  {loading ? (
                    <TailSpin
                      height="18"
                      width="18"
                      color="white"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      visible={true}
                    />
                  ) : (
                    <BsArrowRight className="w-6 h-6" />
                  )}
                </button>
              ) /* : selected === pMethod[1].value ? (
                <button
                  disabled={loading}
                  type="button"
                  onClick={handlePayment}
                  className={`flex gap-2 justify-center items-center uppercase text-md font-medium tracking-widest text-white bg-[#D02F2F] px-6 py-2 hover:bg-black transition-all ease-in-out duration-300 ${
                    loading && "opacity-50 hover:!bg-[#D02F2F]"
                  }`}
                >
                  CONTINUE TO PAY{" "}
                  {loading ? (
                    <TailSpin
                      height="18"
                      width="18"
                      color="white"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      visible={true}
                    />
                  ) : (
                    <BsArrowRight className="w-6 h-6" />
                  )}
                </button>
              ) */ : (
                <>
                  {" "}
                  {loading && <div>Loading...</div>}
                  <PayPalScriptProvider>
                    <PayPalButtons
                      style={style}
                      onClick={(data, actions) => {
                        setLoading(true);
                        const hasAlreadyBoughtCourse = false;
                        const isFormValid = validateForm2();

                        if (hasAlreadyBoughtCourse) {
                          setError("You Already bought this course");
                          setLoading(false);
                          return actions.reject();
                        } else if (!isFormValid) {
                          setError("Please fill out all required fields");
                          setLoading(false);
                          return actions.reject();
                        } else {
                          setLoading(false);
                          return actions.resolve();
                        }
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              description: "test purchase",
                              amount: {
                                value: subTotalAmount + shippingAmount,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, action) => {
                        const order = await action.order.capture();
                        console.log("order", order);

                        // Access the transaction ID
                        const transactionID = order.id;
                        console.log("Transaction ID:", transactionID);

                        handleApprove(data.orderID);
                      }}
                      onCancel={() => {}}
                      onError={(err) => {
                        setError(err);
                        console.log("PayPal Checkout onError", err);
                      }}
                      fundingSource={FUNDING.PAYPAL}
                    />
                  </PayPalScriptProvider>
                  {/* {error && <div>{error}</div>} */}
                </>
              )}
            </div>
          </form>
        </div>
      ) : (
        <NoDataFound title={"Items Not Found"} />
      )}
         {/*  <button onClick={sendMail}>send mail</button> */}

    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ShippingAddress;
