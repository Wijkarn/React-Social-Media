import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function DisplayPosts({ displayUser, username }) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        setPosts(null);
        async function getUsers() {
            try {
                const response = await fetch("/get-posts-from-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: displayUser })
                });

                const data = await response.json();

                setPosts(data);
            }
            catch (e) {
                console.error(e);
                alert("Error getting posts from user! " + e);
            }
        }
        getUsers();
    }, [displayUser]);

    return (
        <ol id="posts-div">
            {posts ? (
                Object.keys(posts).map(postId => (
                    <div key={postId} className="post">
                        <h2 className=""><NavLink to={`/profile/${displayUser}/post/${postId}`}> {posts[postId].title}</NavLink></h2>
                        <p>{posts[postId].content}</p>
                        <p>{posts[postId].date}</p>
                        <p>Post by: {displayUser}</p>
                    </div>
                ))
            ) : (
                <div>
                    <h2>No Posts!</h2>
                </div>
            )}
        </ol>
    );
}
