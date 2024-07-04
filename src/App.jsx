import { Route, Routes } from "react-router-dom";
import "./app.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import axios from "axios";
import Account from "./screens/Account";
import { useContext, useEffect } from "react";
import { UserContext } from "../contex/UserContex";
import Places from "./components/account/Places";
import PlacesFormPage from "./components/account/PlacesFormPage";
import PlacePage from "./components/homepage/PlacePage";

axios.defaults.baseURL = "https://airbnb-clone-backend-b14p.onrender.com";
axios.defaults.withCredentials = true;
function App() {
  const { setUser, setReady, user } = useContext(UserContext);
  useEffect(() => {
    axios
      .get("/profile", {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((res) => setUser(res.data));
    setReady(true);
    console.log(document.cookie.replace("token=", ""));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/places" element={<Places />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
      </Routes>
    </>
  );
}

export default App;
