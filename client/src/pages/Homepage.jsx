import { useOutletContext } from "react-router-dom";
import DisplayUsers from "../components/DisplayUsers";

export default function HomePage() {

  const [username] = useOutletContext();

  return (
    <div>
      <h1>Welcome to the home page{username ? " " + username : ""}!</h1>
      <DisplayUsers />
    </div>
  );
}
