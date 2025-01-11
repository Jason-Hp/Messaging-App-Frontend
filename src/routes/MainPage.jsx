import { useState,useEffect } from "react";
import axios from "axios";
import Error from "./error"
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"


const MainPage = () =>{
    const [user,setUser] = useState(null)
    const [error,setError] = useState(null)
    const navigate = useNavigate(); 

    useEffect(() => {
        async function fetching() {
            try{
                const raw = await axios.get("http://localhost:3000/api/users/current");
                const data = raw.data.data;
                setUser(data)
                setError(null)
            }
            catch(err){
                setError(err.response?.data?.message || "Please Login to acces this page");
            }

        }
        fetching();
    },[]);

    const logout = async() =>{
        setUser(null)
        setError(null)

        await axios.get("http://localhost:3000/api/logout/");
        navigate("/login")
    }

    if(error){
        return(
            <div>
                <Error error={error}/>
                <Link to="/login">Login</Link>
            </div>
        )
    }else{
        return(
            <div>
                <div>
                    <Navbar user={user}/>
                    <button onClick={logout}>Logout</button>
                </div>
                <div>
                    <Sidebar />
                </div>
                
            </div>
        )
    }

}

export default MainPage