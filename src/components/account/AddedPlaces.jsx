import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import classes from "./addedplaces.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contex/UserContex";

const AddedPlaces = () => {
  const [places, setPlaces] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    axios
      .get("/user-places", { headers: { Authorization: user?.token } })
      .then(({ data }) => setPlaces(data));
  }, []);
  return (
    <>
      <div className={classes.added_places}>
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link to={"/account/places/" + place._id}>
                <div className={classes.place}>
                  <img
                    src={place.photos[0]}
                    alt=""
                  />
                  <div className={classes.place_info}>
                    <h2>{place.title}</h2>
                    <p>{place.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default AddedPlaces;
