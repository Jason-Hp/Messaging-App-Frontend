import { useState, useEffect } from "react";
import axios from "axios";
import Error from "./error";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { CartContext } from "../context";

const MainPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetching() {
            try {
                const raw = await axios.get("http://localhost:3000/api/users/current");
                const data = raw.data.data;
                setUser(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || "Please Login to access this page");
            }
        }
        fetching();
    }, [])

    const logout = async () => {
        setUser(null);
        setError(null);

        await axios.get("http://localhost:3000/api/logout/");
        navigate("/login");
    };

    if (error) {
        return (
            <div className="flex justify-center items-center flex-col mt-10">
                <Error error={error} />
                <Link to="/login" className="text-blue-600 hover:text-blue-800 mt-4">Login</Link>
            </div>
        )
    } else {
        return (
            <div className="flex">
                <CartContext.Provider value={{ user }}>
                    <div className="w-full">
                        <Navbar user={user} />
                        <button 
                            onClick={logout} 
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mt-4 ml-4"
                        >
                            Logout
                        </button>
                        <div >
                            <Sidebar />
                        </div>
                    </div>
                </CartContext.Provider>
            </div>
        )
    }
};

export default MainPage