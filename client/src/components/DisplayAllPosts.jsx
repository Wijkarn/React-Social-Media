import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

export default function DisplayPosts({ displayUser }) {
    const [loadingText, setLoadingText] = useState("Loading posts.");
    const loadingPosts = useMemo(() => ({
        loadingPost: {
            content: loadingText
        }
    }), [loadingText]);
    const [posts, setPosts] = useState(loadingPosts);

    useEffect(() => {
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
                setPosts(null);
            }
        }
        getUsers();
    }, [displayUser]);

    useEffect(() => {
        if (posts && Object.keys(posts)[0] === "loadingPost") {
            const intervalId = setInterval(() => {
                setLoadingText(prevText => prevText.split('.').length > 3 ? "Loading posts." : prevText + ".");
                setPosts(loadingPosts);
            }, 250);

            return () => clearInterval(intervalId);
        }
    }, [posts, loadingPosts]);

    return (
        <div id="posts-div">
            {posts ? (
                Object.keys(posts).map(postId => (
                    <div key={postId} className="post">
                        <h2><NavLink to={`/profile/${displayUser}/post/${postId}`}> {posts[postId].title}</NavLink></h2>
                        <p>{posts[postId].content}</p>
                        <span>{posts[postId].date}</span>
                    </div>
                ))
            ) : (
                <div>
                    <h2>Error getting posts</h2>
                </div>
            )}
        </div>
    );
}
