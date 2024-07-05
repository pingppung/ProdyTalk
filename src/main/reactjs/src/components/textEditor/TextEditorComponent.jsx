import React, {useState, useEffect} from "react";
import '../css/TextEditor.css';
import TextEditorService from '../../service/TextEditorService';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function TextEditorComponent(props) {
    const { quill, quillRef } = useQuill();
    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                TextEditorService.changeText(quill.getContents());
            });
        }
    },[quill]);
    return (
        <div className="main-content">
            <div ref={quillRef} />
        </div>
    );
}

export default TextEditorComponent;