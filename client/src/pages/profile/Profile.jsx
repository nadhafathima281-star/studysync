import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateAvatar } from "../../api/authApi";
import toast from "react-hot-toast";
import ExportReports from "../../components/reports/ExportReports";
import "./profile.css";

export default function Profile() {

  const { user, setUser } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [avatar, setAvatar] = useState(
    user?.avatar ||
    "https://api.dicebear.com/7.x/personas/svg?seed=study1"
  );

  const avatars = [
    "https://api.dicebear.com/7.x/personas/svg?seed=study1",
    "https://api.dicebear.com/7.x/personas/svg?seed=study2",
    "https://api.dicebear.com/7.x/personas/svg?seed=study3",
    "https://api.dicebear.com/7.x/personas/svg?seed=study4",
    "https://api.dicebear.com/7.x/personas/svg?seed=study5",
    "https://api.dicebear.com/7.x/personas/svg?seed=study6"
  ];

  const openModal = () => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setAvatar(user?.avatar);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {

      const res = await updateAvatar(avatar);

      const updatedUser = {
        ...user,
        avatar: res.data.avatar,
        name,
        phone
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      toast.success("Profile updated successfully");

      setShowModal(false);

    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }
  };

  return (

    <div className="profile-page">

      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">

        {/* HEADER */}

        <div className="profile-header">

          <img
            src={avatar}
            className="profile-avatar"
            alt="avatar"
          />

          <div className="profile-main">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

          <button
            className="primary-btn"
            onClick={openModal}
          >
            Edit Profile
          </button>

        </div>


        {/* INFO GRID */}

        <div className="profile-grid">

          <div className="profile-item">
            <span>Name</span>
            <p>{user?.name}</p>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <p>{user?.email}</p>
          </div>

          <div className="profile-item">
            <span>Phone</span>
            <p>{user?.phone || "Not added"}</p>
          </div>

          <div className="profile-item">
            <span>Role</span>
            <p>{user?.role}</p>
          </div>

        </div>

      </div>
<ExportReports/>


      {/* EDIT MODAL */}

      {showModal && (

        <div className="profile-modal-overlay">

          <div className="profile-modal">

            <h2>Edit Profile</h2>


            {/* AVATAR SELECTION */}

            <div className="avatar-picker">

              <h4>Select Avatar</h4>

              <div className="avatar-grid">

                {avatars.map((a) => (
                  <img
                    key={a}
                    src={a}
                    alt="avatar"
                    className={`avatar-option ${
                      avatar === a ? "selected" : ""
                    }`}
                    onClick={() => setAvatar(a)}
                  />
                ))}

              </div>

            </div>


            {/* NAME */}

            <label>Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="profile-input"
            />


            {/* PHONE */}

            <label>Phone</label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="profile-input"
              placeholder="Enter phone number"
            />


            {/* ACTIONS */}

            <div className="profile-actions">

              <button
                className="secondary-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={handleSave}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}