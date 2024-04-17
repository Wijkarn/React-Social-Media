import React from "react";
import DisplayUsers from "../components/DisplayUsers";
import Navbar from "../components/Navbar/Navbar";
import "../css/App.css";
import { useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  return (
    <>
      <Navbar username={params.username}></Navbar>
      <DisplayUsers></DisplayUsers>
      <h1>{params.username}</h1>
    </>
  );
}
