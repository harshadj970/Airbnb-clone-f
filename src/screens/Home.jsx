import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/homepage/Navbar";
import axios from "axios";
import AllPlaces from "../components/homepage/AllPlaces";

const Home = () => {
  
  return (
    <>
      <Navbar />
      <AllPlaces/>
    </>
  );
};

export default Home;
