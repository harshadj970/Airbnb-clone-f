import React, { useContext, useState } from "react";
import Navbar from "../components/homepage/Navbar";
import classes from "../components/login/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contex/UserContex";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate=useNavigate();
  const { setUser}=useContext(UserContext);
  const handleLogin = async function () {
    try {
     const response= await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      navigate('/');
      setUser(response.data);
      alert("login successful");
    } catch (error) {
      alert("login failed");
    }
  };
  return (
    <>
      <Navbar />
      <div className={classes.login}>
        <h1>Login</h1>
        <div className={classes.login_form}>
          <form>
            <input
            required
              type="text"
              name="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
            required
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Login
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to={"/register"}>Register now</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
