import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setSearch("");
            navigate(`/search?username=${encodeURIComponent(search)}`);
        }
    }

    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200"
                >
                    Search
                </button>
            </form>
        </div>
    )
}

export default Navbar