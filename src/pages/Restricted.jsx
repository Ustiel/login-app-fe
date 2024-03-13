import React, { useEffect, useState } from "react";
import DataService from "../services/dataservice";

export default function Restricted(){
  const [content, setContent] = useState("");
  const isManager = JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_MANAGER");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (isManager) {
          const response = await DataService.getManagerContent();
          const data = response.data; 
          setContent(data);
        } else {
          setContent('Unauthorized access: Manager only');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setContent('Error fetching content');
      }
    };

    fetchContent();
  }, [isManager]); 

    return (
        <div id="content-body">
            <h2>{content}</h2>
        </div>

    );
}