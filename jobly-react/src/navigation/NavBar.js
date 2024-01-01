import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../general/AuthContext";

const NavBar = ({logout})=> {
    const { currentUser } = useContext(AuthContext);

    const currentUserNav = ()=> {
        return (
            <nav>
                <NavLink to="/companies">
                  Companies
                </NavLink>
                <NavLink to="/jobs">
                  Jobs
                </NavLink>
                <NavLink to="/profile">
                  Profile
                </NavLink>
                <Link to="/" onClick={logout}>
                  Log out {currentUser.username}
                </Link>
                </nav>
        );
      }
    
      const anonNav= ()=> {
        return (
            <nav>
                <NavLink to="/login">
                  Login
                </NavLink>
                <NavLink to="/signup">
                  Sign Up
                </NavLink>
            </nav>
        );
      }
    
      return (
          <nav>
            <Link to="/">
              Jobly
            </Link>
            {currentUser ? currentUserNav() : anonNav()}
          </nav>
      );
};

export default NavBar;
