import LoginForm from "../components/LoginForm";
import { useOutletContext } from "react-router-dom";
import LogOutForm from "../components/LogOutForm";

export default function HomePage() {
  const [username, setUsername] = useOutletContext();
  return (
    username ? (
      <LogOutForm username={username} setUsername={setUsername} />
    ) : (
      <LoginForm setUsername={setUsername} />
    )
  );
}
