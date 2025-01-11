import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import Error from "./error";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("")

    const query = searchParams.get("username");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/results`, {
                    params: { username: query },
                });
                setResults(res.data.data);
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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setSearchParams({ username: search.trim() })
            setSearch("")
        }
    };

    const onClick = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/chats", {
                title: item.username,
                contactId: item.id,
            });
            setError(null);
            setResults([]);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Create new chat failed. Try again.");
        }
    };

    return (
        <div>
            {error && <Error error={error}/>}
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search usernames"
                />
                <button type="submit">Search</button>
            </form>
            <h2>Number of results ({results.length})</h2>
            <ul>
                {results.map((item) => (
                    <li key={item.id} onClick={() => onClick(item)}>
                        {item.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;