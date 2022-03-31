import Fab from '@mui/material/Fab';
import {React,useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import RoomModal from "./RoomModal";

function RoomCreate(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true); // modal open
    };

    const closeModal = () => {
        setModalOpen(false); // modal close
    };

    const addModal = (room_name, room_type) => {

        setModalOpen(false); // Modal 닫아주기
    };

    return (
        <div>
            <RoomModal open={modalOpen} close={closeModal} propFunction={addModal} header="새로운 Room 생성">
            </RoomModal>

            <Fab color="primary" aria-label="add" onClick={openModal}>
                <AddIcon  />
            </Fab>
        </div>
    );
}
export default RoomCreate;
