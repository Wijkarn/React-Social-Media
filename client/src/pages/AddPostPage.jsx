import "../css/AddPost.css";
import { useOutletContext } from "react-router-dom";

export default function AddPostPage() {
    const [username] = useOutletContext();

    if (!username) {
        window.location.replace("/login");
    }

    async function handleNewPost(e) {
        e.preventDefault();

        if (username) {
            try {
                const formData = new FormData(e.target);
                const title = formData.get("title");
                const content = formData.get("content");

                const uploadContent = {
                    username,
                    title,
                    content
                }

                const response = await fetch("/upload-post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(uploadContent)
                });

                const data = await response.json();
                
                if (data) {
                    window.location.replace(`/profile/${username}/post/${data.name}`);
                }
                else {
                    alert("Error uploading post");
                }
            }
            catch (e) {
                alert("Error uploading post " + e);
                console.error(e);
            }
        }
    }

    return (
        <div id="form-div">
            <form onSubmit={handleNewPost} id="form-upload-post">
                <label htmlFor="form-title">Title:</label>
                <input type="text" name="title" id="form-title" required autoComplete="off" />
                <label htmlFor="form-content">Post Content:</label>
                <textarea type="text" name="content" id="form-content" required autoComplete="off" rows="10" cols="50" />
                <button type="submit" id="upload-post-btn">Post!</button>
            </form>
        </div>
    );
}
