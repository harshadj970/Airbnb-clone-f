import React, { useState } from "react";
import classes from "./places.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddedPlaces from "./AddedPlaces";
import Navbar from "../homepage/Navbar";
import AccountNav from "./AccountNav";
const Places = () => {
  return (
    <>
      <Navbar />
      <AccountNav />
      <AddedPlaces />
      <div className={classes.places}>
        <Link to={"/account/places/new"}>
          <button className={classes.add_place_btn}>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <p>Add new place</p>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Places;
