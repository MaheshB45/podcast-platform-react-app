// React-router-dom library
import { useNavigate } from "react-router-dom";

// React library
import { useReducer } from "react";

// Redux library
import { setUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

// Firebase library
import { auth, storage, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Common Component
import Button from "../Button";
import FileInput from "../Input/FileInput";
import InputComponent from "../Input";
// React toastify library
import { toast } from "react-toastify";

const EditProfileForm = () => {
  // Redux dispatch
  const dispatch = useDispatch();

  // Redux state
  const { user } = useSelector((state) => state.user);

  // Navigate
  const Navigate = useNavigate();

  //useReducer to handel form state
  const [formState, formDispatch] = useReducer(formReducer, {
    fullName: "",
    profileImage: "",
    loading: false,
  });

  //   Validate form
  async function validateForm() {

    if(formState.fullName === "" && formState.profileImage === "") {
      toast.error("Atleast one field must be updated");
      return;
    }
    try {
      formDispatch({ type: "LOADING", payLoad: true });
      //Storing the user profile in storage
      const profileImgRef = ref(
        storage,
        `images/profile_images/${auth.currentUser.uid}/${Date.now()}`
      );

      // uploading the profile image
      formState.profileImage &&
        (await uploadBytes(profileImgRef, formState.profileImage));

      // Downloading the profile image URL
      const profileURL =
        formState.profileImage && (await getDownloadURL(profileImgRef));

      // Updating the user profile image or name in database
      const docRef = doc(db, "users", auth.currentUser.uid);

      // updating if profile image present
      formState.profileImage && (await updateDoc(docRef, {profileURL: profileURL,}));

    //  updating if full name present
      formState.fullName && (await updateDoc(docRef, {fullName: formState.fullName,}));


      // Storing the data in redux store
      formState.fullName &&  dispatch(setUser({ ...user, fullName: formState.fullName}));
     formState.profileImage &&   dispatch(setUser({ ...user, profileURL: profileURL }));

      // Showing success message
      formDispatch({ type: "SUCCESS" });
      toast.success("Profile updated successfully!");
      //   Navigate to profile
      Navigate("/profile");
    } catch (e) {
      formDispatch({ type: "LOADING", payLoad: false });
      toast.error(e.message);
    }
  }

  //   Function to handleSubmit
  function handleSubmit(e) {
    e.preventDefault();
    if (formState.loading) {
      return;
    }
    validateForm();
  }

  //   Form Reducer function
  function formReducer(state, action) {
    if (action.type === "PROFILE") {
      return { ...state, profileImage: action.payLoad };
    }
    else if(action.type === "FULLNAME"){
      return { ...state, fullName: action.payLoad };
    } 
    else if (action.type === "LOADING") {
      return { ...state, loading: action.payLoad };
    } else if (action.type === "SUCCESS") {
      return { ...state, loading: false, profileImage: "" };
    }
    return state;
  }

  return (
    <div className="input-wrapper">
      <h1 className="heading-page">Edit Profile</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <InputComponent
          type={"text"}
          name={"fullName"}
          placeholder={"Enter New Name."}
          onInput={(e) => {
            formDispatch({ type: "FULLNAME", payLoad: e.target.value });
          }}
        />
        <FileInput
          id={"Profile-img"}
          name={"Profile"}
          accept={"image/*"}
          onFileSelected={(file) => formDispatch({ type: "PROFILE", payLoad: file })}
        ></FileInput>
        {!formState.loading ? (
          <Button type={"submit"} text={"Update Now"} />
        ) : (
          <Button
            type={"button"}
            className={"Loading"}
            text={"L O A D I N G . . ."}
          />
        )}
      </form>
    </div>
  );
};

export default EditProfileForm;