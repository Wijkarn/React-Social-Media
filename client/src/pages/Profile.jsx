import DisplayUsers from "../components/DisplayUsers";
import { useParams } from "react-router-dom";
import DisplayPosts from "../components/DisplayAllPosts";
//import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  //const [username, setUsername] = useOutletContext();
  return (
    <div>
      <DisplayUsers />
      <h1>{params.username}</h1>
      <DisplayPosts displayUser={params.username} />
    </div>
  );
}
