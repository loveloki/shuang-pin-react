import React from 'react'

const InputGroup = (props) => {
    const {inputValue, onChange, onKeyUp, isInputRight} = props;
    return (
        <div className='input-group'>
            <input
                type="text"
                value={inputValue}
                onChange={onChange}
                onKeyUp={onKeyUp}
                autoFocus
            />
                {isInputRight
                    ?<span className='input-true' role="img" aria-label="right-input">✔️</span>
                    :<span className='input-false' role="img" aria-label="wrong-input">❌</span>
                }
        </div>
    )
}

export default InputGroup;