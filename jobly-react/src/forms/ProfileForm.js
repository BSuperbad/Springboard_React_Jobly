import React, { useContext, useState } from "react";
import JoblyApi from "../api/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../general/AuthContext";

const ProfileForm = ({update}) => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: currentUser.username,
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, firstName, lastName } = formData;

    try {
      await update(username, {
        email,
        firstName,
        lastName,
      });
      const updatedUser = await JoblyApi.getUser(username);
      
      setCurrentUser(updatedUser);
      navigate("/");
      setFormData(INITIAL_STATE);
    } catch (error) {
      console.error('Profile update failed', error);
    }
  };

  return (
    <div>
      <h2>Edit your profile!</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;
