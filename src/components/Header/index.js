import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { clearUser } from "../../slices/userSlice";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="header-wrapper">
      <div className="gradient" />
      <div className="links">
        <Link
          to="/"
          style={{ color: currentPath == "/" ? "white" : "#8ea6bb" }}
        >
          Signup
        </Link>
        <Link
          to="/podcasts"
          style={{ color: currentPath == "/podcasts" ? "white" : "#8ea6bb" }}
        >
          Podcasts
        </Link>
        <Link
          to="/create-podcast"
          style={{
            color: currentPath == "/create-podcast" ? "white" : "#8ea6bb",
          }}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          style={{ color: currentPath == "/profile" ? "white" : "#8ea6bb" }}
        >
          Profile
        </Link>
        {user && (
          <Link to="#" onClick={handleSignOut}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;