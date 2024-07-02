import React, { useEffect, useState } from "react";
import Navbar from "../components/homepage/Navbar";
import classes from "../components/register/register.module.css";
import { Link } from "react-router-dom";
import user from "../assets/default_user.png";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  const handleRegister = async function () {
    try {
      await axios.post("/register", { name, email, password, avatar });
      alert("registration successful");
    } catch (error) {
      alert("try again later...");
    }
  };
  const handleUpload = (e) => {
    const file = e.target.files;
    const data = new FormData();
    data.append("profile", file[0]);
    axios
      .post("/upload-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setAvatar(res.data.filename);
      });
  };
  useEffect(() => {
    console.log(avatar);
  }, [avatar]);
  return (
    <>
      <Navbar />
      <div className={classes.register}>
        <h1>Register</h1>
        <div className={classes.register_form}>
          <form>
            <div className={classes.profile_photo}>
              <label>
                <img
                  src={
                    avatar
                      ? `https://airbnb-clone-backend-b14p.onrender.com/uploads/${avatar}`
                      : user
                  }
                  alt=""
                />
                <input type="file" name="" onChange={(e) => handleUpload(e)} />
              </label>
              <p>Upload photo</p>
            </div>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              type="submit"
            >
              Register
            </button>
          </form>
          <p>
            Already a member?
            <span>
              <Link to={"/login"}>Login now</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
