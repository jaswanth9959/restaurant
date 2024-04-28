import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Admin() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role !== "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default Admin;
