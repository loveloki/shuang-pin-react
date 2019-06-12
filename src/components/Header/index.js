import React from 'react';
import './index.css'

const Header = () => {
    return (
        <header>
            <span>点击页面任意地方开始输入</span>
            <span>输入会实时判断对错</span>
            <span role="img" aria-label="typing-input">如果显示⭕，请继续输入</span>
            <span role="img" aria-label="wrong-input">如果显示❌，请按ESC或者BACKSPAC键删除</span>
            <span role="img" aria-label="right-input">如果显示✔️，请按回车进入下一个输入</span>
        </header>
    )
};

export default Header;