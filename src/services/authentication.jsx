import axios from "axios";


const API_URL = "http://localhost:8080/api/app/";

//post username and pw, add user info to local storage
const login = (username, password) => {

  console.log("login verification")

  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

//post logout request,remove user info from local storage
const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "logout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser
}
export default AuthService;