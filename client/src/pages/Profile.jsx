import DisplayUsers from "../components/DisplayUsers";
import { useParams } from "react-router-dom";
//import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  //const [username, setUsername] = useOutletContext();
  return (
    <>
      <DisplayUsers />
      <h1>{params.username}</h1>
    </>
  );
}
