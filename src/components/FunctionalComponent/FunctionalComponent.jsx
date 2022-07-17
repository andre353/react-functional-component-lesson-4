import React, {useState, useEffect} from 'react';
import style from './FunctionalComponent.module.css';
import PropTypes from 'prop-types';

export const FunctionalComponent = ({min, max}) => {
  const [userNumberFromInput, setUserNumberFromInput] = useState('');
  const [count, setCount] = useState(0);
  const [result, setResult] = useState('Результат');
  const [randomNumber] = useState(
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  // ограничения в виде массива зависимости нет =
  // колбек запускается каждый раз при rerender
  useEffect(() => {
    console.log('useEffect - CDU'); // ComponentDidUpdate
  });

  // useEffect запускается первый раз ПЕРЕД render,
  // регистрирует массив зависимостей - он пуст
  // далее вызывает колбэк функцию

  // когда происходит rerender
  // снова проверяется массив зависимости
  // если изменений нет - callback НЕ ЗАПУСКАЕТСЯ.
  // т.е. при пустом массиве колбек вызывается единожды
  useEffect(() => {
    console.log('[]useEffect - CDM'); // ComponentDidMount
  }, []);

  // колбэк вызывается каждый раз при внесении нового значения в input
  useEffect(() => {
    console.log('[userNumberFromInput]useEffect - CDM'); // ComponentDidMount
  }, [userNumberFromInput]);

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
