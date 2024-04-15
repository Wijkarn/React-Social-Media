import React from "react";
import DisplayUsers from "./components/displayusers";
import Navbar from "./components/Navbar/navbar";
import "./css/App.css"

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <DisplayUsers></DisplayUsers>
    </>
  );
}
