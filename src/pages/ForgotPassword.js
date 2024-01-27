// Navbar Component
import Header from "../components/Header";
// Reset Passwords Component
import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";

const ForgotPassword = () => {
    return (
        <div className='ForgotPassword'>
           <Header/>
           <ResetPasswordForm/> 
        </div>
    );
}

export default ForgotPassword;