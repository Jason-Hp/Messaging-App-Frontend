import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setSearch("")
            navigate(`/search?username=${encodeURIComponent(search)}`);
        }
    };

    return (
        <div>
            <h1>Welcome, {user?.username}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search..."
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Navbar;