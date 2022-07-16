import React, {useState} from 'react';
import style from './FunctionalComponent.module.css';
import PropTypes from 'prop-types';

export const FunctionalComponent = ({min, max}) => {
  const [userNumberFromInput, setUserNumberFromInput] = useState('');
  const [count, setCount] = useState(0);
  const [result, setResult] = useState('Результат');
  const [randomNumber] = useState(
    Math.floor(Math.random() * (max - min + 1)) + min
  );
    // как и метод setState, useState и все use хуки- асинхронные
    // React uses batching to group state updates within event handlers
    // and inbuilt hooks. It prevents components from re-rendering
    // for each state update and improves application performance.
    // React 17, and prior versions only support batching for browser events.
  console.log(userNumberFromInput, randomNumber, count);

  const handleSubmit = e => {
    e.preventDefault();

    // при submit формы в очередь передается каждое
    // из инкрементированных значений count
    // setCount(count + 1); // 1 передается в очередь
    // setCount(count + 1); // 1 передается в очередь
    // setCount(count + 1); // 1 передается в очередь
    // setCount(count + 1); // 1 передается в очередь
    // Результат count = 1, не сохраняются новые значения, не суммируются
    // предыдущее перетирается последующим,
    // так как нет передачи состояния/значения
    // из предыдущего в следующий setCount;

    // А таким образом мы обеспечим последовательную передачу
    // значений = суммируем все значения count - благодаря batching и
    // асинхронности значения count за 1 render будем единым - будет равно
    // сумме всех вызовов-ретернов setCount
    setCount(prevCount => prevCount + 1); // ОБЯЗАТЕЛЬНО К ПРИМЕНЕНИЮ
    setCount(prevCount => prevCount + 1); // ЕСЛИ ЕСТЬ ЗАВИСИМОСТЬ
    setCount(prevCount => prevCount + 1); // ОТ ПРЕДЫДУЩЕГО СОСТОЯНИЯ!!!


    // 1) Получается в set... можно передать функцию () => {}
    // которая вернет значение через return
    // после того, как будет вызвана функция-обертка
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

      return `Вы угадали, загаданное число ${userNumberFromInput}`;
    });
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
        <button
          className={style.btn}
          disabled={!userNumberFromInput && true}>Угадать</button>
      </form>
    </div>
  );
};

FunctionalComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
