import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import classes from "./placepage.module.css";
import defaultPfp from "../../assets/default_user.png";
const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAllImage, setShowAllImage] = useState(false);
  const [host, setHost] = useState();
  useEffect(() => {
    axios.get(`/place/${id}`).then(({ data }) => {
      setPlace(data);
      const host = {
        id: data.owner,
      };
      axios
        .get("/user/", {
          params: host,
        })
        .then(({ data }) => {
          setHost(data);
        });
    });
  }, [id]);
  return (
    <>
      <Navbar />
      <hr color="#f1f1f1" />
      <div className={classes.place}>
        <p className={classes.title}>
          {place.title}{" "}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Share
          </span>
        </p>
        <div className={classes.img_gallery}>
          <img
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setShowAllImage(true);
            }}
            src={place?.photos?.[0]}
            alt=""
          />
          <div>
            <img
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setShowAllImage(true);
              }}
              src={place?.photos?.[1]}
              alt=""
            />
            <img
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setShowAllImage(true);
              }}
              src={place?.photos?.[2]}
              alt=""
            />
            <p
              className={classes.all_photos}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setShowAllImage(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path
                  fillRule="evenodd"
                  d="M3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                ></path>
              </svg>
              Show all photos
            </p>
          </div>
        </div>
        <div className={classes.place_info_outer}>
          <div className={classes.place_info}>
            <div className={classes.address}>
              <p>{place.address}</p>
              <p>
                <span>{place.maxGuests} guests</span>{" "}
                <span className={classes.dot}>•</span>{" "}
                <span>{place.bedrooms} bedroom </span>
                <span className={classes.dot}>•</span>{" "}
                <span>{place.bathrooms} private bathroom</span>
              </p>
              <p className={classes.rating}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  ></path>
                </svg>{" "}
                No reviews yet
              </p>
            </div>
            <hr color="#f1f1f1" />
            <div className={classes.host_info}>
              <img
                src={
                  host?.avatar
                    ? `${host?.avatar}`
                    : defaultPfp
                }
                alt=""
              />
              <div>
                <p>Hosted by</p>
                <p>{host?.name}</p>
              </div>
            </div>
            <hr color="#f1f1f1" />
            <div className={classes.description}>
              <p>Where you'll be</p>
              <p>{place.description}</p>
            </div>
            <hr color="#f1f1f1" />
            <div className={classes.meet_host}>
              <h2>Meet your host</h2>
            </div>
          </div>
        </div>
      </div>
      {showAllImage ? (
        <div className={classes.all_image}>
          <p className={classes.close} onClick={() => setShowAllImage(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </p>
          <h1>{`All images of ${place?.title}`}</h1>
          <div>
            {place?.photos?.map((photo) => {
              return (
                <img src={photo} alt="" />
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PlacePage;
