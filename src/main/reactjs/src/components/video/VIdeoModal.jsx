import React, { useState } from 'react';
import '../css/Modal.css';

const VideoModal = (props) => {
    const { open, close, header } = props;
    const[camera, setCamera] = useState('');

    return(
        <div className="modal">
            <section>
              <header>
                {header}
              </header>
              <div className="modal-body">
                 카메라 선택, 마이크 선택, 화면공유
              </div>
              <footer>
                <button className="close" onClick={close}>
                  close
                </button>
              </footer>

            </section>
        </div>
    );
};
export default VideoModal;