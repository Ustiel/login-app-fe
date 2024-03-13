import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authentication";

export default function Login(){

    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("in handleSubmit")
        setMessage("");
      
        AuthService.login(username, password).then(
            () => {
                navigate("/user");
                window.location.reload();
            },
            (error) => {
                setMessage("Login failed. Invalid userid or password. ");
            }
        );
      };


    return (
        <div id="content-body">
            <h1>Login</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-div">
                            <label>Username
                                <input
                                    type = "text"
                                    name = "username"
                                    value = {username} 
                                    onChange={onChangeUsername}
                                    required
                                />
                            </label>

                            <label>Password
                                <input
                                    type = "password"
                                    name = "password"
                                    value = {password} 
                                    onChange={onChangePassword}
                                    required
                                />
                            </label>
                        </div>

                        <p>{message}</p>
                        <input type="submit" className="submit-btn" />

                    </form>  
                    
            </div>
        </div>

    );
}