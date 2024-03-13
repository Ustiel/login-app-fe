import React, { useEffect, useState } from "react";
import AuthService from "../services/authentication";

export default function Home(){
    const currentUser = AuthService.getCurrentUser();

    return (
        <div id="content-body">
            <h1>Welcome {currentUser==undefined? "" :currentUser.name}!</h1>
            <h2>Username: {currentUser==undefined? "" :currentUser.username}</h2>
            <h2>Role: {currentUser === undefined ? "" : currentUser.roles.map((role, index) => <span key={index}>{role.substring(5)}</span>)}</h2>
        </div>
    );
}