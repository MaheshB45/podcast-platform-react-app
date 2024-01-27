/* eslint-disable react-hooks/exhaustive-deps */
import './index.css';
import { Routes, Route, useNavigate } from "react-router-dom";
// React libraries
import { useEffect } from "react";
// React toastify libraries
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Private route component
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// Firebase libraries
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// Redux libraries 
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";

// Pages routes
import SignUpPage from './pages/SignUpPage';
import ForgotPassword from "./pages/ForgotPassword";
import Podcasts from "./pages/Podcasts";
import StartAPodcast from "./pages/StartAPodcast";
import PodcastDetails from "./pages/PodcastDetails";
import PodcastCreateEpisode from "./pages/PodcastCreateEpisode";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {

  const dispatch = useDispatch();

  const Navigate = useNavigate();
 
  //useEffect to authorize user if already signed in
  useEffect(() => {
    
    Navigate("/profile");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
           
            const docData = docSnap.data();
            dispatch(
              setUser({
                fullName: docData.fullName,
                email: docData.email,
                profileURL : docData.profileURL,
                uid: docData.uid,
              })
              );
          }
        });
       
      } else {
        // No user is signed in.
        toast.success("Welcome Anonymous");
        Navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    
    <Routes>
        <Route path="/" element={<SignUpPage />}></Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/podcasts" element={<Podcasts />}></Route>
          <Route path="/startApodcast" element={<StartAPodcast />}></Route>
          <Route path="/podcastDetails/:id" element={<PodcastDetails />}></Route>
          <Route path="/podcast/create-episode/:id" element={<PodcastCreateEpisode />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/editProfile" element={<EditProfile />}></Route>
        </Route>
          <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
