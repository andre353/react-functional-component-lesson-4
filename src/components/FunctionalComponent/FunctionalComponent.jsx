import React, {useState, useEffect} from 'react';
import style from './FunctionalComponent.module.css';
import PropTypes from 'prop-types';
import {Button} from './Button/Button';

export const FunctionalComponent = ({min, max}) => {
  const [userNumberFromInput, setUserNumberFromInput] = useState('');
  const [count, setCount] = useState(0);
  const [result, setResult] = useState('Результат');
  const [randomNumber, setRandomNumber] = useState(0);
  const [showBtn, setShowBtn] = useState(true);

  // const cleanState = () => {
  //   setShowBtn(true);
  //   setResult('Играем заново!');
  // };
  // колбэк вызывается каждый раз как угадано число
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * (max - min + 1)) + min);
    console.log('[showBtn] - основной компон', showBtn, randomNumber);
    // const timer = setTimeout(() => cleanState(), 1000);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [showBtn]); // запускается, когда showBtn становится false

  // альтернатива cleanState
  useEffect(() => {
    setShowBtn(true);
  }, [randomNumber]); // в свою очередь измененное randnumber изменит showBtn

  const handleSubmit = e => {
    e.preventDefault();
    setCount(count + 1);
    setResult(() => {
      if (!userNumberFromInput ||
        userNumberFromInput < min ||
        userNumberFromInput > max) {
        return `Введите число от ${min} до ${max}`;
      }

      if (userNumberFromInput > randomNumber) {
        return `${userNumberFromInput} больше загаданного числа`;
      }

      if (userNumberFromInput < randomNumber) {
        return `${userNumberFromInput} меньше загаданного числа`;
      }

      setShowBtn(false);
      setCount(0);
      setUserNumberFromInput('');
      return `Вы угадали, загаданное число ${userNumberFromInput}`;
    });
    console.log('input: ', userNumberFromInput, randomNumber, 'count: ', count);
  };
  // 2) Получается в set... можно передать значение
  const handleChange = (e) => {
    setUserNumberFromInput(e.target.value);
  };

  return (
    <div className={style.game}>
      <p className={style.result}>{result}</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor='user_number'>
          Попыток {count}
        </label>
        <input
          className={style.input}
          type='number'
          id='user_number'
          value={userNumberFromInput}
          onChange={handleChange}
        />
        {showBtn && <Button
          disabled={!userNumberFromInput && true}
          text='Угадать'/>}
      </form>
    </div>
  );
};

FunctionalComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
