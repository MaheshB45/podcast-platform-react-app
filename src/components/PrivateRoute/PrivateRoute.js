// firebase Authentication
import { useAuthState } from 'react-firebase-hooks/auth';
// imorted firebase file
import { auth } from '../../firebase';
// React router dom library
import { Navigate ,Outlet } from 'react-router-dom';
// React toastifu library
import {toast} from "react-toastify"

// PrivateRoute css
import "./PrivateRoute.css";

const PrivateRoute = () => {
    const [user, loading, error] = useAuthState(auth);
  
    if(loading)
    {
        return <div className='body'>
            <div className='loading' style={{color:"white"}}>Loading...</div>
        </div>;
    }
    if(error || !user)
    {
        toast.error("Please Signup or Login");
       return <Navigate to="/" replace></Navigate>
    } 
    return <Outlet></Outlet>
}

export default PrivateRoute;