// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("adminToken");
//   const expireAt = localStorage.getItem("adminTokenExpire");

//   const currentTime = new Date().getTime();
//   const isExpired = !expireAt || currentTime > parseInt(expireAt);

//   if (!isAuthenticated || isExpired) {
//     // clear expired values
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminTokenExpire");
//     return <Navigate to="/admin/login" />;
//   }

//   return children;
// };

// export default PrivateRoute;

