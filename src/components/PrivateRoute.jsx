import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../Hooks/useAuthStatus"

const PrivateRoute = () => {
  let { loggedIn, checkingStatus} = useAuthStatus()
  if(checkingStatus){
    return <h2>Loading...</h2>
  }
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}
export default PrivateRoute