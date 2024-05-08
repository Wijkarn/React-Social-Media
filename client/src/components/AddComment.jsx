import { useState } from "react";

export default function AddComment({ username, postId, postUploader }) {
    const [textOpen, setTextOpen] = useState(false);

    function toggleTextArea() {
        setTextOpen(currentState => !currentState);
    }

    async function postComment(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const commentContent = formData.get("post-comment-textarea");

            if (commentContent.length < 1) {
                alert("Empty comment");
                return;
            }

            const obj = {
                postId,
                postUser: postUploader,
                commentUser: username,
                commentContent
            }

            const response = await fetch("/upload-comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            const data = await response.json();

            if (data) {
                setTextOpen(false);
            }
            else {
                alert("Error posting comment!");
            }
        }
        catch (e) {
            console.log(e);
            alert("Error posting comment! " + e);
        }
    }

    return (
        <div>
            {username ? <button className="open-comment-btn" onClick={toggleTextArea}>{textOpen ? "I don't want to comment!" : "Add a comment to this post!"}</button> : ""}
            {textOpen ?
                <div>
                    <form onSubmit={postComment}>
                        <input id="post-comment-textarea" name="post-comment-textarea" />
                        <button className="post-comment-btn">Post comment!</button>
                    </form>
                </div>
                : ""}
        </div>
    );
}