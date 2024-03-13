import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route,Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Restricted from "./pages/Restricted";

import EventBus from "./common/EventBus";
import AuthService from './services/authentication';

export default function App() {
  const [showManagerContent, setShowManagerContent] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowManagerContent(user.roles.includes("ROLE_MANAGER"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  
  const logOut = () => {
    AuthService.logout();
    setShowManagerContent(false);
    setCurrentUser(undefined);
  };


  return (
      <div>
        <nav>
            <div className="nav-container">
                <ul>
                  {currentUser ? (
                      <div>
                        {showManagerContent && (
                          <li className="navlink">
                            <Link to="/manager">Manager Content</Link>
                          </li>
                        )}
                        <li className="navlink">
                          <Link to="/login" onClick={logOut}>Logout</Link>
                        </li>
                      </div>
                    ) : (
                      <div></div>
                    )}
                </ul>
            </div>
        </nav>
        <Routes>
          <Route exact path={"/"} element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Home />} />
          <Route path="/manager" element={<Restricted />} />
          <Route path="/logout" element={<Login />} />
        </Routes>
      </div>
  );
}

