import React, {useState} from 'react';
import style from './FuncComplex.module.css';
import PropTypes from 'prop-types';

export const FuncComplex = ({min, max}) => {
  // комплексный state в виде объекта (отличается от атомарного state)
  // используется, когда 2 значения созависимы и меняются
  // при определенных событиях
  const [state, setState] = useState({
    userNumberFromInput: '',
    count: 0,
    result: 'Результат',
  });

  const [randomNumber] = useState(
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  console.log(state.userNumberFromInput, randomNumber, state.count);

  const handleSubmit = e => {
    e.preventDefault();

    // 1. новое значение count образуется суммированием со старым
    // 2. значение count в старом объекте
    // перетирается новым значением count - образуется новый объект
    // setState((prevState) => ({...prevState, count: state.count + 1}));

    setState((prevState) => {
      let result = '';
      let count = prevState.count;
      if (!state.userNumberFromInput ||
        state.userNumberFromInput < min ||
        state.userNumberFromInput > max) {
        return {...prevState, result: `Введите число от ${min} до ${max}`};
      }

      count++;
      if (state.userNumberFromInput > randomNumber) {
        result = `${state.userNumberFromInput} больше загаданного числа`;
      } else if (state.userNumberFromInput < randomNumber) {
        result = `${state.userNumberFromInput} меньше загаданного числа`;
      } else {
        result = `Вы угадали, загаданное число ${state.userNumberFromInput}. 
        Попыток ${count}`;
      }

      // state будет обновлятся при каждом клике Угадать
      // т.е. count++ стработает при одном клике только 1 раз
      // и обновится в state:
      return {...prevState, count, result};
    });
  };
  // получаем новое значение и каждый раз его перезаписываем
  const handleChange = (e) => {
    setState({...state, userNumberFromInput: e.target.value});
  };

  return (
    <div className={style.game}>
      <p className={style.result}>{state.result}</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor='user_number'>
          Попыток {state.count}
        </label>
        <input
          className={style.input}
          type='number'
          id='user_number'
          value={state.userNumberFromInput}
          onChange={handleChange}
        />
        <button
          className={style.btn}
          disabled={!state.userNumberFromInput && true}>Угадать</button>
      </form>
    </div>
  );
};

FuncComplex.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
