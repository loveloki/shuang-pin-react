import React from 'react';

const Tips = (props) => {
    const { tips } = props;
    return (
        <div className='tips'>{tips.map((tip, index) => <span key={index}>{tip}</span>)}</div>
    )
};

export default Tips;