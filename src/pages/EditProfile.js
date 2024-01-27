// Navbar Component
import Header from "../components/Header";

// Form Component
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";

const EditProfile = () => {
    return (
        <div className="EditProfile">
            <Header/>
           <EditProfileForm/>
        </div>
    );
}

export default EditProfile;