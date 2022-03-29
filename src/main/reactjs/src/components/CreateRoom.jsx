import axios from 'axios';

//const ROOM_API_BASE_URL = "http://localhost:8080/roomlist";

class RoomService {
    getRooms() {
        return axios.get("/roomlist", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }

    createRoom(room) {
        return axios.post("/createroom", JSON.stringify(room),{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": 'application/json',
            },
        });
    }
}

export default new RoomService();