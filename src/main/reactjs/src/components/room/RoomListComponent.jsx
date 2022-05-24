import React,{ useState, useEffect } from 'react';
import RoomService from '../../service/RoomService';
import RoomCircle from './RoomCircle.jsx';
import RoomCreate from './RoomCreate.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/Room.css';


function RoomListComponent() {

    const [rooms,setRooms]=useState([])
    const [loading,setLoading]=useState(false)
    const [state,setState]=useState(false)
    const settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 6,
          slidesToScroll: 1,
          centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
        }

    useEffect(() => {
        RoomService.getRooms().then((res) => {
            setRooms(res.data);
            setLoading(true)
        })

    },[state]);

    return (
    <div className="roomlist">
        { loading === true
         ? <div className="slider">

            <Slider {...settings}>
                {rooms.map(room =>
                    <div><RoomCircle title={room.room_name} type={room.room_type} id={room.room_id}/></div>)
                }

            </Slider>
          </div>
         : <div className="circular"><CircularProgress /></div>

         }

    </div>
    )

}

export default RoomListComponent;