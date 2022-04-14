import axios from 'axios';

class ChatService {

    getUserName(){
        return axios.get("/api/chatting", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }
}

export default new ChatService();

