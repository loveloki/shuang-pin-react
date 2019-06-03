import React from 'react'
import './index.css'

const DisplayInput = (props) => {
    const { value, isInputRight } = props;

    return(
        <div className='display-input'>
            <span>{value || "请输入拼音"}</span>
            {value && (isInputRight
              ?<span className='input-true' role="img" aria-label="right-input">✔️</span>
              :<span className='input-false' role="img" aria-label="wrong-input">❌</span>
							)
            }
        </div>
    )
}

export default DisplayInput;