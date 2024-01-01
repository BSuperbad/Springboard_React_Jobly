import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({signup}) => {
    const navigate = useNavigate();


    const INITIAL_STATE = {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""

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
        const { username, email, password, firstName, lastName } = formData;
      
        try {
          await signup({
            username,
            email,
            password,
            firstName,
            lastName,
          });
      
          navigate("/");
          setFormData(INITIAL_STATE);
        } catch (error) {
          console.error('Registration failed:', error);
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

            <label htmlFor="firstName">First name</label>
            <input 
            type="text" 
            name="firstName"
            id="firstName" value={formData.firstName} 
            onChange={handleChange}
            />

            <label htmlFor="lastName">Last name</label>
            <input 
            type="text" 
            name="lastName"
            id="lastName" value={formData.lastName} 
            onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            name="email"
            id="email" value={formData.email} 
            onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    )
}

export default SignUpForm;