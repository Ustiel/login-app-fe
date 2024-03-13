import axios from "axios";

const API_URL = "http://localhost:8080/api/test";


//user + manager
const getUserContent = () => {
  return axios.get(API_URL + "/user");
};

//only manager
const getManagerContent = () => {
  return axios.get(API_URL + "/manager", {withCredentials:true});
};

const UserService = {
    getUserContent,
    getManagerContent
}

export default UserService;