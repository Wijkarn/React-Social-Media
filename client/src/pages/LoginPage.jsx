import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "../css/App.css";
import LoginForm from "../components/LoginForm";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <LoginForm></LoginForm>
    </>
  );
}
