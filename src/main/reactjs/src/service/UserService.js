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

    getUserById(id){
        return axios.get("api/getUser", {
            params: { user_id: id, }
            })
    }

    editUser(user_id,user_name,user_pwd,user_email,user_phone){
        console.log("데이터 서비스")
        return axios.post("/api/editUser", {
                    user_id: user_id,
                    user_name: user_name,
                    user_pwd: user_pwd,
                    user_email: user_email,
                    user_phone: user_phone,
                });
    }

}

export default new UserService();
