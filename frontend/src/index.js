import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import StaffLogin from "./screens/StaffLogin";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/Register";
import Address from "./screens/Address";
import Protect from "./utils/Protect";
import Payment from "./screens/Payment";
import Profile from "./screens/Profile";
import PayOrder from "./screens/PayOrder";
import Success from "./screens/Success";
import Cancel from "./screens/Cancel";
import AllOrders from "./screens/AllOrders";
import Admin from "./utils/Admin";
import Dashboard from "./screens/protected/Dashboard";
import OnlineOrders from "./screens/protected/OnlineOrders";
import CounterOrders from "./screens/protected/CounterOrders";
import Users from "./screens/protected/Users";
import Staff from "./screens/protected/Staff";
import UserEdit from "./screens/protected/UserEdit";
import StaffEdit from "./screens/protected/StaffEdit";
import StaffAdd from "./screens/protected/StaffAdd";
import Menu from "./screens/protected/Menu";
import MenuAdd from "./screens/protected/MenuAdd";
import MenuEdit from "./screens/protected/MenuEdit";
import Analytics from "./screens/protected/Analytics";
import ReadyOrders from "./screens/protected/ReadyOrders";
import StaffProfile from "./screens/protected/StaffProfile";
import UserDetails from "./screens/UserDetails";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/staff" element={<StaffLogin />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<Protect />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/paymentmethod" element={<Payment />} />
        <Route path="/delivery" element={<Address />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order/:id" element={<PayOrder />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/staffprofile" element={<StaffProfile />} />
        <Route path="/myorders" element={<AllOrders />} />
        <Route path="" element={<Admin />}>
          <Route path="/board" element={<Dashboard />}>
            <Route path="/board" element={<Analytics />} />
            <Route path="/board/online" element={<OnlineOrders />} />
            <Route path="/board/counter" element={<CounterOrders />} />
            <Route path="/board/order/:id" element={<PayOrder />} />
            <Route path="/board/users" element={<Users />} />
            <Route path="/board/user/:id" element={<UserEdit />} />
            <Route path="/board/staff" element={<Staff />} />
            <Route path="/board/staff/:id" element={<StaffEdit />} />
            <Route path="/board/staff/add" element={<StaffAdd />} />
            <Route path="/board/menu" element={<Menu />} />
            <Route path="/board/ready" element={<ReadyOrders />} />
            <Route path="/board/menu/add" element={<MenuAdd />} />
            <Route path="/board/item/:id" element={<MenuEdit />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
