import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DisplayPost() {
    const loadingPost = {
        title: "Loading Post!",
        content: "",
        date: ""
    }

    const [post, setPost] = useState(loadingPost);
    const params = useParams();

    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch("/get-a-post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: params.username, postId: params.postId })
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
    }, [params.username, params.postId]);

    return (
        <ol>
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>{post.date}</p>
                </div>
            ) : (
                <div>
                    <h2>Post doesn't exist!</h2>
                </div>
            )}
        </ol>
    );
}
