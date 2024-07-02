import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./places.module.css";
import PhotoUploader from "./PhotoUploader";
import Perks from "./Perks";
import Navbar from "../homepage/Navbar";
import AccountNav from "./AccountNav";
import { UserContext } from "../../../contex/UserContex";
const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price,setPrice]=useState();
  const [bedroom,setBedroom]=useState(1);
  const [bathroom,setBathroom]=useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const {user}=useContext(UserContext);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
      setBathroom(data.bathrooms);
      setBedroom(data.bedrooms);
    });
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      bedroom,
      bathroom
    };
    if (id) {
      await axios.put("/places", {
        id,
        ...data,
      },{
        headers:{
          'Authorization': user.token
        }
      });
    } else {
      await axios.post("/places", {
        ...data,
      });
    }
    navigate("/account/places");
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data: files } = res;
        console.log(files[0].filename);
        const filenames = files.map((file) => file.filename);
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };
  return (
    <>
      <Navbar />
      <AccountNav />
      <div className={classes.add_place_form}>
        <form onSubmit={save}>
          <h2>Title</h2>
          <p>
            Title for your place. Should be short and catchy as in advertisement
          </p>
          <input
            type="text"
            placeholder="title for example My lovely apt"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2>Address</h2>
          <p>Address to this place</p>
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <PhotoUploader
            handleUpload={handleUpload}
            addedPhotos={addedPhotos}
            photoLink={photoLink}
            setPhotoLink={setPhotoLink}
            addPhotoByLink={addPhotoByLink}
            setAddedPhotos={setAddedPhotos}
          />
          <h2>Description</h2>
          <p>description of the place</p>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <h2>Perks</h2>
          <p>select all the perks of your place</p>
          <div className={classes.perks}>
            <Perks perks={perks} setPerks={setPerks} />
          </div>
          <h2>Extra info</h2>
          <p>house rules, etc</p>
          <textarea
            rows={3}
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          ></textarea>
          <h2>Check in & out times</h2>
          <p>
            add check in and out times, remember to have some time for cleaning
            the room in between.
          </p>
          <div className={classes.timings}>
            <div>
              <p>Check in time</p>
              <input
                type="text"
                placeholder="10:00"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <p>Check out time</p>
              <input
                type="text"
                placeholder="8:00"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <p>Max number of guests</p>
              <input
                type="number"
                min={1}
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <p>Price per night</p>
              <input
                type="number"
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
            <h2>About Living space</h2>
          <div className={classes.living_space}>
          <div>
              <p>Number of bedrooms</p>
              <input
                type="number"
                min={1}
                value={bedroom}
                onChange={(e) => setBedroom(e.target.value)}
              />
            </div>
            <div>
              <p>Number of Bathrooms</p>
              <input
                type="number"
                min={1}
                value={bathroom}
                onChange={(e) => setBathroom(e.target.value)}
              />
            </div>
          </div>
          <button className={classes.save}>Add</button>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
