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

    function createDate(stringDate) {
        const date = new Date(stringDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${hours}:${minutes} ${day}-${month}-${year}`;
    }

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

                data.date = createDate(data.date);

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
