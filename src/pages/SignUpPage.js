import Header from "../components/Header/index";
import SignupLoginForm from "../components/SignupLoginForm/index";

const SignUpPage = () => {
  return (
    <>
      <Header />
      <div className="input-wrapper">
        <SignupLoginForm />
      </div>
    </>
  );
};

export default SignUpPage;
