import { Navigate, useOutletContext } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children}){
  if(!isLoggedIn){
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;

