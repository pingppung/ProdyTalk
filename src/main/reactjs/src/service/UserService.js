import axios from 'axios';

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
        return axios.post("/signup", JSON.stringify(user), {
        	headers: { "Content-Type": `application/json`}
            }
        ).then((res) => {
             console.log(res);
        })
    }

}

export default new UserService();
