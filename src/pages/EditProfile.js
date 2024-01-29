// Navbar Component
import Header from "../components/Header";

// Form Component
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";

const EditProfile = () => {
  return (
    <>
      <Header />
      <div className="input-wrapper">
        <EditProfileForm />
      </div>
    </>
  );
};

export default EditProfile;
