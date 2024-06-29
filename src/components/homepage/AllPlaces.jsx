import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./allplaces.module.css";
import { Link } from "react-router-dom";

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <>
      <div className={classes.places}>
        {places.map((place) => {
          return (
            <>
            <Link to={'place/'+place._id}>
              <div className={classes.place}>
                <img
                  src={"http://localhost:8080/uploads/" + place?.photos[0]}
                  alt=""
                />
                <p>{place.address}</p>
                <p>{place.title}</p>
                <p><span>₹ {place.price}</span> per night</p>
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
