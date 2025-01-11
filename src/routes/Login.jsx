import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Error from "./error"

const Login = () =>{
    const[loginData,setLoginData] = useState({
        username: "",
        password: "",
      })
    const [error,setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError(null)

        try{
            const response = await axios.post("http://localhost:3000/api/login", {
                username: loginData.username,
                password: loginData.password,
              });

              if(response.status == 200){
                navigate("/")
              }
        }
        catch(err){
            setError(err.response?.data?.message || "Login failed. Try again.")
        }
    }

    return(
        <div>
            <h2 className="text-3xl font-bold underline">Login</h2>

            {error && <Error error={error}/>}
            
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={handleChange} required/>
                    </div>                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={handleChange} required/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            
        </div>
    )

}

export default Login;