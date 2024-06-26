import { useParams } from "react-router-dom";
import DisplayPosts from "../components/DisplayAllPosts";
import DisplayPost from "../components/DisplayPost";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  const [username] = useOutletContext();
  return (
    <div>
      <h1>{params.username}</h1>
      {params.postId ? (
        <DisplayPost loggedInUser={username} />
      ) : (
        <DisplayPosts displayUser={params.username} />
      )}
    </div>
  );
}
