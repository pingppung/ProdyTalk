import React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function TodoListItem(props) {
    return (
    <div className="todolist-item">
        <Checkbox
            {...label}
            defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        />
        {props.content}
    </div>
    );
}

export default TodoListItem;