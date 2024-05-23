import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import DisplayComments from "./DisplayComments";

export default function DisplayPost({ loggedInUser }) {
    const [loadingText, setLoadingText] = useState("Loading Post.");
    const loadingPost = useMemo(() => ({
        title: loadingText
    }), [loadingText]);

    const [post, setPost] = useState(loadingPost);
    const [comments, setComments] = useState(null);

    const params = useParams();
    const username = params.username;
    const postId = params.postId;

    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch("/get-a-post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, postId })
                });

                const data = await response.json();

                setPost(data);
                if (data) {
                    setComments(data.comments);
                }
            }
            catch (e) {
                setPost(null);
                console.error(e);
            }
        }
        getPost();
    }, [username, postId]);

    useEffect(() => {
        if (post && !post.content) {
            const intervalId = setInterval(() => {
                setLoadingText(prevText => prevText.split('.').length > 3 ? "Loading Post." : prevText + ".");
                setPost(loadingPost);
            }, 250);

            return () => clearInterval(intervalId);
        }
    }, [post, loadingPost]);

    function deletePost(e) {
        e.preventDefault();

        fetch("/delete-post", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, postId })
        });
    }

    return (
        <div id="posts-div" className="post">
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>{post.date}</p>
                    {loggedInUser === username ? <button onClick={deletePost} id="delete-post-btn">Delete Post!</button> : ""}

                    {loggedInUser ? <AddComment username={loggedInUser} postId={postId} postUploader={username} setComments={setComments} /> : ""}

                    {comments ? <DisplayComments postId={postId} postUser={username} username={loggedInUser} comments={comments} setComments={setComments} /> : ""}
                </>
            ) : (
                <h2>Error getting post!</h2>
            )}
        </div>
    );
}
