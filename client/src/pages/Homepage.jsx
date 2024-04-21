import { useOutletContext } from "react-router-dom";

export default function HomePage() {

  const [username] = useOutletContext();

  return (
    <h1>Welcome to the home page{username ? " " + username : ""}!</h1>
  );
}
