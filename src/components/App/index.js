import React, { useState, useRef } from 'react';
import './index.css';
import config from '../../constants/config';
import scheme from '../../constants/scheme';
import dict from '../../constants/dict'
import utils from '../../constants/utils'
import shuangImg from '../../constants/img/xiaohe.png';

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
      <header className="App-header">
        <div className='random-hanzi'>
          <span>请输入：</span>
          <ruby>
            {hanZi}<rt>{sheng + yun}</rt>  
          </ruby> 
        </div> 
        {/* {inputValue
        ? inputValue
        : "请输入拼音"} */}
        <div className='input-group'>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => handleChange(event)}
            onKeyUp={(event) => handleKeyUp(event)}
            ref={inputEl}
            autoFocus
        />
            {isInputRight
              ?<span className='input-true' role="img" aria-label="right-input">✔️</span>
              :<span className='input-false' role="img" aria-label="wrong-input">❌</span>
            }
        </div>
        <img src={shuangImg} alt={name}/>
      </header>
    </div>
  );
}

export default App;
