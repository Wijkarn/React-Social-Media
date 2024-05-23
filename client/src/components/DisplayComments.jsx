import "../css/Comment.css";
import DisplayComment from "./DisplayComment";

export default function DisplayComments({ comments, username, postId, postUser, setComments }) {
    return (
        <div className="comments-div">
            <h2>Comments</h2>
            {Object.keys(comments).map(comment => (
                <DisplayComment comment={comments[comment]} key={comment} username={username} commentId={comment} postId={postId} postUser={postUser} setComments={setComments} />
            ))}
        </div>
    );
}