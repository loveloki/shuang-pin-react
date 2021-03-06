import React, { useState, useRef } from 'react';
import './index.css';
import config from '../../constants/config';
import scheme from '../../constants/scheme';
import dict from '../../constants/dict'
import utils from '../../constants/utils'
import shuangImg from '../../constants/img/xiaohe.png';
import DisplayInput from '../DisplayInput';
import Tips from './../Tips';
import Header from '../Header';

//随机返回汉字：[声母， 韵母， 汉字]
const randomHanZi = () => {
  const type = dict.random;

  //声母
  const shengObject = type;
  const shengList = Object.keys(shengObject);
  const randomIndex = utils.getRandomIntBetweemMinAndMax(0, shengList.length - 1);
  const shengRandom = shengList[randomIndex]  
  
  //韵母
  const yunObject = type[shengRandom];
  const yunList = Object.keys(yunObject);
  const yunRandomIndex = utils.getRandomIntBetweemMinAndMax(0, yunList.length - 1);
  const yunRandom = yunList[yunRandomIndex]

  //汉字
  const hanZi = type[shengRandom][yunRandom]
  
  return [shengRandom, yunRandom, hanZi];
}

const App = () => {
  const str = randomHanZi()
  const [sheng, SetSheng] = useState(str[0]);
  const [yun, SetYun] = useState(str[1]);
  const [hanZi, SetHanZi] = useState(str[2]);
  const [inputValue, SetInputValue] = useState("");
  const inputEl = useRef(null);
  const name = Object.keys(scheme);
  const tips = scheme[name].tips;


  const handleChange = (event) => {
    const value = event.target.value;

    //只能输入两个字母
    if (value.length < 3) {
      SetInputValue(value);
    }    

  }

  const clearInput = () => {
    SetInputValue("");
  }

  const nextHanZi = () => {
    const str = randomHanZi();
    
    SetSheng(str[0]);
    SetYun(str[1]);
    SetHanZi(str[2]);
  }

  const getSheng = () => {
    const shengList = scheme[config.scheme].detail.sheng;
    const trueSheng = shengList[sheng];
    
    return trueSheng;
  }
  const getYun = () => {
    const yunList = scheme[config.scheme].detail.yun;
    const trueYun = yunList[yun];

    return trueYun;
  }

  const getPinYin = () => {
    //零声母
    if (sheng === '') {
      const pinYin = scheme[config.scheme].detail.other[sheng + yun];
            
      return pinYin;
    }
    //否则
    const trueSheng = getSheng();
    const trueYun = getYun();

    return trueSheng + trueYun;
  }

  const isTyping = () => {
    const pinYin = getPinYin();    

    if (inputValue === pinYin[0]) {
      return true;
    }

    return false;
  }
  const isInputRight = () => {
    const pinYin = getPinYin();    

    if (inputValue === pinYin) {
      return true;
    }

    return false;
  }

  const goNextInput = (flag = false) => {
    if (flag) {
      nextHanZi();
      clearInput();
    }
  }
  const handleKeyUp = (event) => {
    switch (event.key) {
      case "Enter":
        goNextInput(isInputRight());
        break;
      case "Escape":
        clearInput();
        break;
    
      default:
        break;
    }
  }

  const onAppClick = () => {
    inputEl.current.focus();
  }

  return (
    <div
      className="App"
      onClick={onAppClick}>
      <Header />
      <main className="main-content">
        <Tips tips={tips}/>
        <div className='random-hanzi'>
          <ruby>
            {hanZi}<rt>{sheng + yun}</rt>  
          </ruby> 
        </div> 
        <DisplayInput
          value={inputValue}
          isTyping={isTyping()}
          isInputRight={isInputRight()}/>
        <div className='input-group'>
          <textarea
            type="text"
            value={inputValue}
            onChange={(event) => handleChange(event)}
            onKeyUp={(event) => handleKeyUp(event)}
            ref={inputEl}
            autoFocus
          />
        </div>
        <div className='keyboard-img'>
          <img src={shuangImg} alt={name}/>
        </div>
      </main>
    </div>
  );
}

export default App;
