import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({login}) => {
    const navigate = useNavigate();

    const INITIAL_STATE = {
        username: "",
        password: ""
    };
    const [formData, setFormData ] = useState(INITIAL_STATE)

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(data=> ({
            ...data,
            [name] : value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { username, password } = formData;
          await login(username, password);
      
          navigate("/");
          setFormData(INITIAL_STATE);
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
            id="username" 
            type="text" 
            name="username"
            value={formData.username} 
            onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            name="password"
            id="password" value={formData.password} 
            onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    )
}

export default LoginForm;