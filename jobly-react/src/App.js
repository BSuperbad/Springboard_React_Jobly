import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './navigation/NavBar';
import AuthContext from './general/AuthContext';
import MyRoutes from './navigation/MyRoutes';
import JoblyApi from './api/api';
import React, {useState, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const applyForJob = async (jobId) => {
    try {
      await JoblyApi.applyForJob(jobId, currentUser.username);
    } catch (error) {
      console.error('Error applying for the job:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (JoblyApi.token && typeof token === 'string') {
          const decodedToken = jwtDecode(JoblyApi.token);
          const username = decodedToken.username;
  
          const currentUser = await JoblyApi.getUser(username);
  
          setCurrentUser(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
  
    fetchCurrentUser();
  }, [token, setCurrentUser]);
  

  const signup = async (userData) => {
    try {
      let newToken = await JoblyApi.register(userData);
      setToken(newToken);
      localStorage.setItem('token', newToken.token);
    } catch(e) {
      console.error('Signup failed', e);
    }
  };

  const update = async (username, data) => {
    try {
      await JoblyApi.update(username, data);
    } catch(e) {
      console.error('Profile update failed', e);
    }
  };

  const login = async (username, password) => {
    try {
      const userToken = await JoblyApi.authenticate(username, password);
      
      setToken({ token: userToken.token });
      localStorage.setItem('token', userToken.token);

      const decodedToken = jwtDecode(userToken.token);
      const loggedInUser = await JoblyApi.getUser(decodedToken.username);
      setCurrentUser(loggedInUser);
    } catch (e) {
      console.error('Login failed', e);
    }
  }


  const logout = ()=> {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token')
  }

  return (
    <div className="App">
      <BrowserRouter>
      <AuthContext.Provider
      value={{currentUser, setCurrentUser}}>
      <NavBar 
      logout={logout}
      />
      <MyRoutes  
      login={login} 
      signup={signup} 
      update={update}
      applyForJob={applyForJob}
      />
      </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
