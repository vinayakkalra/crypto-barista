import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import NftPage from "./pages/NftPage";
import MerchandisePage from "./pages/MerchandisePage";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";
//import { AstroX } from "@connect2ic/core/providers/astrox";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";

/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";
import { Connect2ICProvider, useConnect } from "@connect2ic/react";
import "@connect2ic/core/style.css";
/*
 * Import canister definitions like this:
 */
import * as backend from "../.dfx/local/canisters/backend";
import { AnimatePresence } from "framer-motion";
import WishlistPage from "./pages/WishlistPage";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import AdminHome from "./pages/admin/AdminHome";
import Sample from "./features/admin/Sample";
import useModal from "./features/modal/useModal";
import CoursePage from "./pages/CoursePage";
import Products from "./pages/admin/Product";
import ProductDetail from "./pages/admin/products/Productdetail";
import CreateProduct from "./pages/admin/products/CreateProduct";
import Order from "./pages/admin/Order";
import Categories from "./pages/admin/Categories";
import Setting from "./pages/admin/Setting";
import VideoPage from "./pages/VideoPage";
import Videos from "./pages/admin/Videos";
import Courses from "./pages/admin/Courses";
import CreateCategory from "./pages/admin/category/CreateCategory";
import CategoryDetail from "./pages/admin/category/CategoryDetail";
import AddVideo from "./pages/admin/video/AddVideo";
import AddCourse from "./pages/admin/course/AddCourse";
import CourseDetail from "./pages/admin/course/CourseDetail";
import VideoDetail from "./pages/admin/video/VideoDetail";
import Message from "./pages/admin/Message";
import MessageDetail from "./pages/admin/message/MessageDetail";

import OrderDetail from "./pages/admin/order/OrderDetail";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Invoice from "./pages/admin/invoice";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/merchandise",
    element: <MerchandisePage></MerchandisePage>,
  },
  {
    path: "/product/:slug",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/nft",
    element: <NftPage></NftPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <Protected>
        <WishlistPage></WishlistPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/courses",
    element: (
      <Protected>
        <CoursePage></CoursePage>
      </Protected>
    ),
  },
  {
    path: "/video/:slug",
    element: (
      <Protected>
        <VideoPage></VideoPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>{" "}
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/my-dashboard",
    element: (
      <Protected>
        <UserDashboard></UserDashboard>
      </Protected>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <Protected>
        <UserProfile></UserProfile>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/sample",
    element: (
      <ProtectedAdmin>
        <Sample></Sample>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/Products",
    element: (
      <ProtectedAdmin>
        <Products />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <Order />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/orders/:id",
    element: (
      <ProtectedAdmin>
        <OrderDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/invoice/:orderId",
    element: (
      <ProtectedAdmin>
        <Invoice />
      </ProtectedAdmin>
    ),
  },
  // {
  //   path: "/admin/orders/invoice",
  //   element: (
  //     <ProtectedAdmin>
  //       <Invoice />
  //     </ProtectedAdmin>
  //   ),
  // },
  {
    path: "/admin/categories",
    element: (
      <ProtectedAdmin>
        <Categories />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/categories/:slug",
    element: (
      <ProtectedAdmin>
        <CategoryDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/categories/create-category",
    element: (
      <ProtectedAdmin>
        <CreateCategory />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/setting",
    element: (
      <ProtectedAdmin>
        <Setting />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/products/create-product",
    element: (
      <ProtectedAdmin>
        <CreateProduct />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/Products/:slug",
    element: (
      <ProtectedAdmin>
        <ProductDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/videos",
    element: (
      <ProtectedAdmin>
        <Videos />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/videos/add-video",
    element: (
      <ProtectedAdmin>
        <AddVideo />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/videos/:slug",
    element: (
      <ProtectedAdmin>
        <VideoDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/courses",
    element: (
      <ProtectedAdmin>
        <Courses />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/courses",
    element: (
      <ProtectedAdmin>
        <Courses />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/cources/add-course",
    element: (
      <ProtectedAdmin>
        <AddCourse />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/courses/:slug",
    element: (
      <ProtectedAdmin>
        <CourseDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/messages",
    element: (
      <ProtectedAdmin>
        <Message />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/messages/:id",
    element: (
      <ProtectedAdmin>
        <MessageDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  /*  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]); */
  console.log(backend);
  const { openModal } = useModal();

  return (
    <>
      <div className="App">
        {/* {isConnected && (  */}
        <PayPalScriptProvider
          options={{
            "client-id":
              "AS3_5SOjIOX5Y5s1jfFN2QaWpnAIIGQhVTK7-GY5YZdu0RyDcV3MqIxfSFtur979FHJ0VQO6Aqop2-nR",
          }}
        >
          <Provider template={AlertTemplate} {...options}>
            <AnimatePresence mode="wait" initial={true}>
              <RouterProvider router={router} />
            </AnimatePresence>
          </Provider>
        </PayPalScriptProvider>
        {/*  )} */}
      </div>
    </>
  );
}

const client = createClient({
  canisters: {
    backend,
  },
  providers: [new InternetIdentity(), new PlugWallet()],
  //providers: defaultProviders,
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: import.meta.env.DEV,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
