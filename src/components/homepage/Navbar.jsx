import React, { useContext } from "react";
import logo from "../../assets/navbar/ABNB_BIG.svg";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contex/UserContex";
const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={classes.navbar}>
      <Link to={"/"}>
        <div className={classes.logo}>
          <img src={logo} alt="" />
        </div>
      </Link>
      <div className={classes.tabs}>
        <div className={classes.tab}>Anywhere</div>
        <div className={classes.divider}></div>
        <div className={classes.tab}>Any week</div>
        <div className={classes.divider}></div>
        <div className={classes.tab}>
          Add guests
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Link to={user ? "/account" : "/login"}>
        <div className={classes.profile}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          {user?.avatar ? (
            <img src={user.avatar} alt="" />
          ) : (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
