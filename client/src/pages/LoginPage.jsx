import "../css/App.css";
import Navbar from "../components/Navbar/Navbar";
import LoginForm from "../components/LoginForm";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <LoginForm></LoginForm>
    </>
  );
}
