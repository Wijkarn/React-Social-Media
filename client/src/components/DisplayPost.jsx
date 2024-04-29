import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DisplayPost({ loggedInUser }) {
    const loadingPost = {
        title: "Loading Post!",
        content: "",
        date: ""
    }

    const [post, setPost] = useState(loadingPost);
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
            }
            catch (e) {
                console.error(e);
                alert("Error getting posts from user! " + e);
            }
        }
        getPost();
    }, [username, postId]);

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
                </>
            ) : (
                <h2>Post doesn't exist!</h2>
            )}
        </div>
    );
}
