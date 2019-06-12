import React from 'react'
import './index.css'

const DisplayInput = (props) => {
    const { value, isTyping, isInputRight } = props;

    return(
        <div className='display-input'>
            <span>{value || "请输入拼音"}</span>
            {value && isTyping &&
                <span className='input-true' role="img" aria-label="typing-input">⭕</span>
            }
            {value && !isTyping && (isInputRight
              ?<span className='input-true' role="img" aria-label="right-input">✔️</span>
              :<span className='input-false' role="img" aria-label="wrong-input">❌</span>
            )
            }
        </div>
    )
}

export default DisplayInput;