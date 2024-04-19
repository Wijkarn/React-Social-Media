import "./css/App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    async function checkSession() {
      const username = localStorage.getItem("username");
      const uuid = localStorage.getItem("uuid");

      if (username && uuid) {
        const cred = {
          username,
          uuid
        }

        const response = await fetch("/browser-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cred)
        });

        const data = await response.json();

        if (!data) {
          localStorage.clear();
          setUsername(null);
        }
      }
    }

    checkSession();
  }, []);

  return (
    <>
      <Navbar username={username} />
      <Outlet context={[username, setUsername]} />
      <p>{username ? username : "Yeet"}</p>
    </>
  );
}
