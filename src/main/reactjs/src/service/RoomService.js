import axios from 'axios';

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