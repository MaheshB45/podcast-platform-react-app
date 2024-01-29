// Navbar Component
import Header from "../components/Header";
// Reset Passwords Component
import ResetPasswordForm from "../components/ResetPasswordForm/ResetPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <Header />
      <div className="input-wrapper">
        <ResetPasswordForm />
      </div>
    </>
  );
};

export default ForgotPassword;
