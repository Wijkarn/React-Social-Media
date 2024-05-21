export default function DisplayComment({ comment, username, commentId, postId, postUser, setComments }) {

    function removeComment(e) {
        e.preventDefault();

        try {
            const commentToDelete = {
                commentId,
                postUser,
                postId
            }

            fetch("/delete-comment", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentToDelete)
            });

            setComments(prevComments => {
                const updatedComments = { ...prevComments };
                delete updatedComments[commentId];
                return Object.keys(updatedComments).length > 0 ? updatedComments : null;
            });
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="comment-div">
            <h3>{comment.user}</h3>
            <span>{comment.content}</span>
            <span className="comment-date">{comment.date}</span>
            {username === comment.user ? <button className="remove-comment-btn" onClick={removeComment}>Remove comment</button> : ""}
        </div>
    );
}