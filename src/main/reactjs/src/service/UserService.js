import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080";

class UserService {
    fetchToken(token) {
        localStorage.setItem("token", token);
        console.log(" token is " + token);
    }

    getUserName(){
        return axios.get("/authenticate", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }

    Signup(user) {
    //    return axios.post("http://localhost:3000/signup", user, {contentType: 'application/json'});
        return axios.post("/signup", JSON.stringify(user), {
        	headers: { "Content-Type": 'application/json'}
            }
        ).then((res) => {
             console.log(res);
        })
    }

}

export default new UserService();
