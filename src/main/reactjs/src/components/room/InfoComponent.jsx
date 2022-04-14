import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import RoomService from '../../service/RoomService'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useAsync} from 'react-async';


function InfoComponent(props) {
    const [total,setTotal]=useState("")
    const [member,setMember]=useState([])
    const [info,setInfo]=useState("")
    const [loading,setLoading]=useState(false)

    const getData = () => {
        return new Promise((resolve) => {
            RoomService.getRoomById(props.roomId)
                .then((res) => {
                    setTotal(res.data.room_total)
                    setInfo(res.data.room_info)
                    RoomService.getMemberById(props.roomId)
                        .then((res) => {
                            setMember(res.data)
                            resolve()
                        })
                })
            })
     }

     useEffect(() => {
        setLoading(false)
        console.log("false")
        const connect = async() => {
            await getData()
                .then(() => {
                    setLoading(true)
                    console.log("true")

                })
        }
        connect()
     },[])

 return (
    <div>
    {
        loading === true
        ? <div>
            방 id = {props.roomId}
            인원수 = {total}
            현재 멤버 = {member.map(mem =>
                mem.user_id +", ")}
            프로젝트 설명 = {info}
        </div>
        : <div>
            <CircularProgress />
        </div>

      }
    </div>

    );
}

export default InfoComponent;