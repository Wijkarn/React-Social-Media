import { useState } from "react";

export default function AddComment({ username, postId, postUploader, setComments }) {
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

            const newComment = {
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
                body: JSON.stringify(newComment)
            });

            const data = await response.json();

            if (data) {
                setTextOpen(false);
                setComments(prevComments => ({
                    ...prevComments,
                    [data.name]: {
                        user: username,
                        content: commentContent,
                        date: "now"
                    }
                }));
            }
            else {
                alert("Error posting comment!");
            }
        }
        catch (e) {
            console.error(e);
            alert("Error posting comment! " + e);
        }
    }

    return (
        <div>
            <button className="open-comment-btn" onClick={toggleTextArea}>{textOpen ? "I don't want to comment!" : "Add a comment to this post!"}</button>
            {textOpen ?
                <div>
                    <form onSubmit={postComment}>
                        <input id="post-comment-textarea" name="post-comment-textarea" />
                        <button className="post-comment-btn" >Post comment!</button>
                    </form>
                </div>
                : ""}
        </div>
    );
}