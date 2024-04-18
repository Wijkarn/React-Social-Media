import "./css/App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {

  const [username, setUsername] = useState(localStorage.getItem("username"));

  return (
    <>
      <Navbar username={username} />
      <Outlet context={[username, setUsername]} />
      <p>{username ? username : "Yeet"}</p>
    </>
  );
}
