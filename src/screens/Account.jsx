import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/homepage/Navbar";
import { UserContext } from "../../contex/UserContex";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import classes from "../components/account/account.module.css";
import Profile from "../components/account/Profile";
import Places from "../components/account/Places";
import AccountNav from "../components/account/AccountNav";
const Account = () => {
  const { user, ready } = useContext(UserContext);
  // let { subpage ,action} = useParams();
  // const [newPlace, setNewPlace] = useState(false);
  // if (subpage == undefined) {
  //   subpage = "account";
  // }
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && !user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <AccountNav/>
      <Profile/>
      {/* {subpage === "account" ? <Profile /> : ""}
      {subpage === "places" ? <Places /> : ""} */}
      {/* {action==='new' ? "" : ""} */}
    </>
  );
};

export default Account;
