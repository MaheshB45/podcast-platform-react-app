// firebase Authentication
import { useAuthState } from 'react-firebase-hooks/auth';
// imorted firebase file
import { auth } from '../../firebase';
// React router dom library
import { Navigate ,Outlet } from 'react-router-dom';
// React toastifu library
import {toast} from "react-toastify"

// Loader css
import "./PrivateRoute.css"

const PrivateRoute = () => {
    const [user, loading, error] = useAuthState(auth);
  
    if(loading)
    {
        return <div className="wrapper">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>;
    }
    if(error || !user)
    {
        toast.error("Please Signup or Login");
       return <Navigate to="/" replace />
    } 
    return <Outlet />
}

export default PrivateRoute;