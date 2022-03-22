import React from 'react';

function LeftMessage(props) {

    const divStyle={
        float:"left"
    }

    return (
        <div style= {divStyle}>

            {props.userId}: {props.content}

        </div>
    )
}

export default LeftMessage;