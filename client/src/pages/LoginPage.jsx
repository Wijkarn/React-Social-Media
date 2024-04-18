import "../css/App.css";
import LoginForm from "../components/LoginForm";
import { useOutletContext } from "react-router-dom";

export default function HomePage() {
  const [, setUsername] = useOutletContext();
  return (
    <LoginForm setUsername={setUsername} />
  );
}
