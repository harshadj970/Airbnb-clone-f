import React, { useContext } from "react";
import { UserContext } from "../../../contex/UserContex";
import classes from "./profile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  };
  return (
    <div className={classes.profile}>
      <div>
        <p>{`Logged in as ${user?.name} (${user?.email})`}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
