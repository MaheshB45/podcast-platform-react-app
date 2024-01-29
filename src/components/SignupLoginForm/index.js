// React Library
import { useReducer, useState } from "react";

//Firebase library
import { auth, storage, db } from "../../firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Redux Library
import { setUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
//
// React router-dom
import { useNavigate } from "react-router-dom";
// React toastify library
import { toast } from "react-toastify";
// Common components
import Button from "../Button/index";
import InputComponent from "../Input/index";
import FileInput from "../Input/FileInput";

const SignupLoginForm = () => {
  //useReducer to handel form state
  const [formState, formDispatch] = useReducer(formReducer, {
    fullName: "",
    email: "",
    password: "",
    confPassword: "",
    profileImage: "",
    loadings: false,
  });

  //useState for loggin or signup
  const [isLogin, setIsLogin] = useState(false);

  //dipatch method
  const dispatch = useDispatch();

  //navigate method
  const navigate = useNavigate();

  //Function to check for alphabets or whitespace
  function containsAlphabet(str) {
    if (
      (str >= "a" && str <= "z") ||
      (str >= "A" && str <= "Z") ||
      str === " "
    ) {
      return true;
    }
    return false;
  }

  // Function to check for Name and password validity
  function checkNamePassValidate(name, password, confPassword) {
    for (let i = 0; i < name.trim().length; i++) {
      if (!containsAlphabet(name[i])) {
        //    formDispatch({type:"ERROR",payLoad:"Enter a valid Name"});
        toast.error("Please enter a valid Name");
        return false;
      }
    }

    if (password !== confPassword) {
      // formDispatch({type:"ERROR",payLoad:"Password didn't match"});
      toast.error("Password didn't match");
      return false;
    }
    return true;
  }

  //Function to valdate Login
  async function validateLogin() {
    const { email, password } = formState;

    try {
      formDispatch({ type: "LOADING", payLoad: true });
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(setUser({ ...userData }));
        toast.success("Logged in successfully");
        navigate("/Profile");
        formDispatch({ type: "SUCESS" });
      } else {
        formDispatch({ type: "LOADING", payLoad: false });
      }
    } catch (error) {
      formDispatch({ type: "LOADING", payLoad: false });
      toast.error("No user found!");
    }
  }

  //Function to validateSignup
  async function validateSignup() {
    const { fullName, password, confPassword } = formState;

    if (!checkNamePassValidate(fullName, password, confPassword)) {
      return;
    } else {
      try {
        formDispatch({ type: "LOADING", payLoad: true });
        //Authenticating the user
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          formState.email,
          formState.password
        );
        const user = userCredentials.user;

        //Storing the user profile in storage
        const profileImgRef = ref(
          storage,
          `images/profile_images/${user.uid}/${Date.now()}`
        );

        // uploading the profile image
        await uploadBytes(profileImgRef, formState.profileImage);

        // Downloading the profile image URL
        const profileURL = await getDownloadURL(profileImgRef);

        //Storing the user in the database
        await setDoc(doc(db, "users", user.uid), {
          fullName: formState.fullName,
          email: formState.email,
          profileURL: profileURL,
          uid: user.uid,
        });

        //Storing information in redux store
        dispatch(
          setUser({
            fullName: formState.fullName,
            email: formState.email,
            profileURL: profileURL,
            uid: user.uid,
          })
        );
        toast.success("Signed in successfully");
        navigate("/Profile");
        formDispatch({ type: "SUCESS" });
      } catch (error) {
        formDispatch({ type: "LOADING", payLoad: false });
        toast.error(error.message);
      }
    }
  }

  //Function to handel submit
  function handelSubmit(e) {
    e.preventDefault();
    if (formState.loading) {
      return;
    }
    !isLogin ? validateSignup() : validateLogin();
  }

  //Form Reducer
  function formReducer(state, action) {
    if (action.type === "FULLNAME") {
      return { ...state, fullName: action.payLoad };
    } else if (action.type === "EMAIL") {
      return { ...state, email: action.payLoad };
    } else if (action.type === "PASSWORD") {
      return { ...state, password: action.payLoad };
    } else if (action.type === "CONFPASSWORD") {
      return { ...state, confPassword: action.payLoad };
    } else if (action.type === "PROFILE") {
      return { ...state, profileImage: action.payLoad };
    } else if (action.type === "LOADING") {
      return { ...state, loading: action.payLoad };
    } else if (action.type === "SUCCESS") {
      return {
        ...state,
        fullName: "",
        email: "",
        password: "",
        confPassword: "",
        profileImage: "",
      };
    }
    return state;
  }

  return (
    <div className="input-wrapper">
      <h1 className="heading-page">{!isLogin ? <h1>SignUp</h1> : <h1>LogIn</h1>}</h1>
      <form onSubmit={handelSubmit}>
        {!isLogin ? (
          <InputComponent
            type={"text"}
            name={"fullName"}
            value={formState.fullName}
            onInput={(e) =>
              formDispatch({ type: "FULLNAME", payLoad: e.target.value })
            }
            placeholder={"Full Name"}
            required={true}
          />
        ) : (
          ""
        )}
        <InputComponent
          type={"email"}
          name={"email"}
          value={formState.email}
          onInput={(e) =>
            formDispatch({ type: "EMAIL", payLoad: e.target.value.trim() })
          }
          placeholder={"Email"}
          required={true}
        />
        <InputComponent
          type={"password"}
          name={"password"}
          value={formState.password}
          onInput={(e) =>
            formDispatch({ type: "PASSWORD", payLoad: e.target.value.trim() })
          }
          placeholder={"Password of atleast length 6"}
          required={true}
        />
        {!isLogin ? (
          <InputComponent
            type={"password"}
            name={"confPassword"}
            value={formState.confPassword}
            onInput={(e) =>
              formDispatch({
                type: "CONFPASSWORD",
                payLoad: e.target.value.trim(),
              })
            }
            placeholder={"Confirm Password"}
            required={true}
          />
        ) : (
          ""
        )}
        {!isLogin ? (
          <FileInput
            id={"Profile-img"}
            text={"Upload Profile Image"}
            name={"Profile"}
            accept={"image/*"}
            onFileSelected={(file) =>
              formDispatch({ type: "PROFILE", payLoad: file })
            }
          />
        ) : (
          ""
        )}

        {formState.loading ? (
          <Button
            type={"button"}
            className={"Loading"}
            text={"L O A D I N G . . ."}
          />
        ) : (
          <Button
            type={"submit"}
            text={!isLogin ? "Signup Now" : "Login Now"}
          />
        )}
      </form>
      {!isLogin ? (
        <p>
          Already have an account?{" "}
          <span style={{ cursor: "pointer" }} onClick={() => setIsLogin(true)}>
            Login.
          </span>
        </p>
      ) : (
        <p>
          Dont have an account?{" "}
          <span style={{ cursor: "pointer" }} onClick={() => setIsLogin(false)}>
            Singup.
          </span>
        </p>
      )}
      {isLogin ? (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/forgotPassword");
          }}
        >
          Forgot Password ?
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignupLoginForm;
