export default function LogOutForm({ username, setUsername }) {

    function handleLogout(e) {
        e.preventDefault();
        console.log("Logout");

        localStorage.clear();
        setUsername(null);
    }

    return (
        <div id="form-div">
            <h2>Are you sure you want to logout {username}?</h2>
            <button onClick={handleLogout} id="log-in-out-btn">Logout</button>
        </div>
    );
}