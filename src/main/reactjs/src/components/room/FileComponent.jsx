import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import FileService from '../../service/FileService';
import FileList from './FileList';

function FileComponent(props) {
    const [fileList,setFileList] = useState([]);
    const [fileInfo,setFileInfo]=useState("");
    const [files,setFiles]=useState([]);

    useEffect(() => {
        FileService.getFiles(props.roomId).then((res) => {
            setFiles(res.data);
        })

    });



    const onChangeFile =  (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const uploadFiles = Array.prototype.slice.call(e.target.files);

      uploadFiles.forEach((uploadFile) => {
        setFileList([...fileList,uploadFile])
        })
    }

     const uploadFile = () => {
        const formData = new FormData()

        fileList.forEach((file) => {
            // 파일 데이터 저장
            formData.append('files', file);
            formData.append('file_info',fileInfo);
            formData.append('room_id',props.roomId);
        });

        axios.post('/api/fileupload',formData);
        console.log("업로드 완료");
        window.alert("업로드 완료")
     }

     const onFileInfo = (e) => {
        setFileInfo(e.target.value);
     }

    return (
        <div>
        <br />
            {files.map(file =>
                <FileList name={file.origin_name} extension={file.extension} info={file.file_info} id={file.file_id} size={file.file_size}/>
            )}
            <input type="file" multiple name="uploadFile" onChange={onChangeFile} />
            <br />
            <input type="text" name="fileInfo" onChange={onFileInfo} />
            <Button variant="contained" color="primary" onClick={uploadFile}> 업로드 </Button>
        </div>

    );
}

export default FileComponent;