import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Error from "./error"

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        Cpassword: "",
      });
      const [error, setError] = useState(null);
      const navigate = useNavigate(); 

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
          const response = await axios.post("http://localhost:3000/api/register", {
            username: formData.username,
            password: formData.password,
            Cpassword: formData.Cpassword,
          });

          if (response.status === 201) {
            alert("Registration successful! Redirecting to login...");
            navigate("/login"); 
          }
        } catch (err) {
          setError(err.response?.data?.message || "Registration failed. Try again.");
        }
      };

      return(
        <div>
            <h2 className="text-3xl font-bold underline">
                Register Your Account!
            </h2>
            {error && <Error error={error}/>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="Cpassword">Confirm Password</label>
                    <input type="password" id="Cpassword" name="Cpassword" value={formData.Cpassword} onChange={handleChange} required/>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
      );

};

export default Register;