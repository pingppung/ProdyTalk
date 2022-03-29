import axios from 'axios';

const ROOM_API_BASE_URL = "http://localhost:8080/roomlist";

class RoomService {
    getRooms() {
        return axios.get("/roomlist");
    }
}

export default new RoomService();
