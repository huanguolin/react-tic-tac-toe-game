import React from 'react';

export default function (props) {
    const classList = ['square'];
    if (props.highlight) {
        classList.push('highlight');
    }
    return (
        <button className={classList.join(' ')} onClick={props.onClick}>
            {props.value}
        </button>
    );
};