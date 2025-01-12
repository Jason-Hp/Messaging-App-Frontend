import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "./error";


const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [user,setUser] = useState(null)
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const query = searchParams.get("username");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/results`, {
                    params: { username: query },
                });
                const resUser = await axios.get("http://localhost:3000/api/users/current")
                setUser(resUser.data.data)
                setResults(filterCurrentUser(res.data.data,resUser.data.data));
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch search results.");
                setResults([]);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filterCurrentUser = (result,currentUser) =>{
        return result.filter((user)=>{
            return currentUser.id != user.id
        })
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setSearchParams({ username: search.trim() });
            setSearch("");
        }
    };

    const onClick = async (item) => {
        try {
            const combined = item.username + "|" + user?.username;
            await axios.post("http://localhost:3000/api/chats", {
                title: combined,
                contactId: item.id,
            });
            setError(null);
            setResults([]);
            navigate("/");
        } catch (error) {
            setError(error.response.data.message || "Create new chat failed. Try again.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            {error && <Error error={error} />}
            <form onSubmit={handleSearchSubmit} className="flex mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search usernames"
                    className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200"
                >
                    Search
                </button>
            </form>
            <h2 className="text-lg font-semibold">Number of results ({results.length})</h2>
            <ul className="space-y-2 mt-4">
                    {results.map((item) => {
                        return(
                            <li key={item.id} onClick={() => onClick(item)} className="cursor-pointer p-2 hover:bg-gray-200 rounded">
                            {item.username}
                        </li>
                        )
                    })}
            </ul>
        </div>
    );
};

export default Search