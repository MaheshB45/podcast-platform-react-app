// react library
import { useReducer } from "react";

// Common components
import InputComponent from "../Input";
import Button from "../Button";

// React toastify
import { toast } from "react-toastify";

// Firebase Library
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// React router library
import { useNavigate } from "react-router-dom";
const ResetPasswordForm = () => {

    // navigate
    const navigate = useNavigate();

  //useReducer to handel form state
  const [formState, formDispatch] = useReducer(formReducer, {
    email: "",
    loading: false,
  });


 async function validateForm(){
     try{
        formDispatch({type:"LOADING",payload:true});
        await sendPasswordResetEmail(auth,formState.email);
        formDispatch({type:"SUCCESS"});
        toast.success(`Mail has been sent to ${formState.email}`);
        navigate("/");
    }
    catch(e){
        formDispatch({type:"LOADING",payload:false});
        toast.error(e.message)
    }
 }


//   Function to handleSubmit event
  function handelSubmit(e){
    e.preventDefault();
    if(formState.loading)
    {
      return;
    }
    validateForm();
  }

//   FormReducer
  function formReducer(state, action) {
    if (action.type === "EMAIL") {
      return { ...state, email: action.payload};
    }

    if (action.type === "LOADING") {
      return { ...state, loading: true };
    }

    if (action.type === "SUCCESS") {
      return { ...state, loading: false };
    }
    return state;
  }



  return (
    <div className="input-wrapper">
      <h1>Reset Password</h1>
      <form onSubmit={handelSubmit}>
        <InputComponent placeholder={"Enter your email"} type={"email"} value={formState.email} onInput={(e)=>{formDispatch({type:"EMAIL",payload : e.target.value})}} required={true}/>
        {
            !formState.loading ? <Button type={"submit"} text={"Reset Now"}/> : <Button type={"button"} className={"Loading"} text={"L O A D I N G . . ."}/>
        }
      </form>
    </div>
  );
};

export default ResetPasswordForm;