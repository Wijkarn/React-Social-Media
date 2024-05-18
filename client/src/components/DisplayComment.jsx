export default function DisplayComment({ comment, username, commentId, postId, postUser, setComments }) {

    function removeComment(e) {
        e.preventDefault();

        try {
            const obj = {
                commentId,
                postUser,
                postId
            }

            fetch("/delete-comment", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            setComments(prevComments => {
                const updatedComments = { ...prevComments };
                delete updatedComments[commentId];
                return updatedComments;
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