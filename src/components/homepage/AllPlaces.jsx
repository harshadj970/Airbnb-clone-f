import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import classes from "./allplaces.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contex/UserContex";

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    axios
      .get("/places", { headers: { Authorization: user?.token } })
      .then(({ data }) => {
        setPlaces(data);
      });
  }, []);
  return (
    <>
      <div className={classes.places}>
        {places.map((place) => {
          return (
            <>
              <Link to={"place/" + place._id}>
                <div className={classes.place}>
                  <img
                    src={place?.photos[0]}
                    alt=""
                  />
                  <p>{place.address}</p>
                  <p>{place.title}</p>
                  <p>
                    <span>₹ {place.price}</span> per night
                  </p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default AllPlaces;
