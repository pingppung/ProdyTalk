import React from 'react';

function Message(props) {

    const divStyle={
        float:"right"
    }

    return (
        <div style= {divStyle}>

            {props.id}: {props.content}

        </div>
    );
}

export default Message;