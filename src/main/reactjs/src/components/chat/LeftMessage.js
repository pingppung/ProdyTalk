import React from 'react';

function LeftMessage(props) {

    return (
        <div className="left-message">
            <div className="left-balloon">
                {props.userId}: {props.content}
            </div>
        </div>
    )
}

export default LeftMessage;