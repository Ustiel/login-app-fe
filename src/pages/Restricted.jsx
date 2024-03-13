import React, { useEffect, useState } from "react";
import DataService from "../services/dataservice";

export default function Restricted(){
    const [content, setContent] = useState("");

    useEffect(() => {
        DataService.getManagerContent().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const getContent =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          setContent("Unauthorized access: " + getContent);
        }
      );
    }, []);

    return (
        <div id="content-body">
            <h2>{content}</h2>
        </div>

    );
}