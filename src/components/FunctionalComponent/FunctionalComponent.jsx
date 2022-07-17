import React, {useState, useMemo, useLayoutEffect} from 'react';
import style from './FunctionalComponent.module.css';
import PropTypes from 'prop-types';
import {Button} from './Button/Button';

export const FunctionalComponent = ({min, max}) => {
  const [userNumberFromInput, setUserNumberFromInput] = useState('');
  const [count, setCount] = useState(0);
  const [result, setResult] = useState('Результат');
  const [showBtn, setShowBtn] = useState(true);
  const [tempRandom, setTempRandom] = useState(0);

  // колбэк вызывается каждый раз, когда угадано число = showBtn стало false
  // useMemo в отличии от useEffect возвращает значение через return
  // useEffect использует return по-другому - вызывает callback перед демонтаж
  const randomNumber = useMemo(() => { // Перерендера страницы нет
    setShowBtn(true);
    console.log('[showBtn] - основной компон', showBtn);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, [showBtn]); // запускается, когда showBtn становится false

  // useEffect работает АСИНХРОННО:
  // сначала выводится на экран 1 из handleSubmit в <p></p>
  // затем Math.random() из useEffect в <p></p>
  // useEffect(() => {
  //   if (tempRandom >= 1) { // значение в <p></p> скачет от 1 до 0-0.99
  //     setTempRandom(Math.random());
  //   }
  // }, [tempRandom]);

  // useLayoutEffect and useEffect are only being executed 
  // after a component did mount lifeycle

  // используй СИНХРОННЫЙ useLayoutEffect, чтобы
  // выводить на экран нужное значение - чтобы они не "скакали"
  // НО ЭТО НАМНОГО БОЛЬШЕ ОТНИМАЕТ ПРОИЗВОДИТЕЛЬНОСТИ
  // it gets triggered synchronously after all DOM mutation.
  // You only want to use this hook when you need to do any
  //  DOM changes directly.
  // This hook is optimized, to allow the engineer to make changes
  // to a DOM node directly before the browser has a chance to paint.
  useLayoutEffect(() => {
    if (tempRandom >= 1) { // т.е. 1 из handleSubmit не успеет отрисоваться
      setTempRandom(Math.random());
    }
  }, [tempRandom]);

  const handleSubmit = e => {
    e.preventDefault();
    setCount((prevCount) => prevCount + 1);
    setTempRandom(1);
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
      <p className={style.result}>{tempRandom}</p>
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
