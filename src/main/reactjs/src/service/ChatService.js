import axios from 'axios';

const CHAT_API_BASE_URL = "https://pingppung.xyz:8080";

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

