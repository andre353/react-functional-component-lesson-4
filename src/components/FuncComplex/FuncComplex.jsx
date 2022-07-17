import React, {useState} from 'react';
import style from './FuncComplex.module.css';
import PropTypes from 'prop-types';

export const FuncComplex = ({min, max}) => {
  const rN = Math.floor(Math.random() * (max - min + 1)) + min;
  // комплексный state в виде объекта (отличается от атомарного state)
  // используется, когда 2 значения созависимы и меняются
  // при определенных событиях
  const [state, setState] = useState({
    userNumberFromInput: '',
    count: 0,
    result: 'Результат',
    playMore: false,
    randomNumber: rN,
  });

  console.log(state.userNumberFromInput, state.randomNumber,
    state.count, state.playMore);

  // const resetInput = () => {
  //   setState((prevState) => ({...prevState, userNumberFromInput: ''}));
  // };

  const handleSubmit = e => {
    e.preventDefault();

    // 1. новое значение count образуется суммированием со старым
    // 2. значение count в старом объекте
    // перетирается новым значением count - образуется новый объект
    // setState((prevState) => ({...prevState, count: state.count + 1}));

    setState((prevState) => {
      let result = '';
      if (!state.userNumberFromInput ||
        state.userNumberFromInput < min ||
        state.userNumberFromInput > max) {
        return {...prevState, result: `Введите число от ${min} до ${max}`};
      }

      let count = prevState.count;
      count++;

      let playMore = prevState.playMore;
      // взяли из state и не меняем
      const randomNumber = prevState.randomNumber;

      let userNumberFromInput = prevState.userNumberFromInput;

      if (userNumberFromInput > randomNumber) {
        result = `${userNumberFromInput} больше загаданного числа`;
      } else if (userNumberFromInput < randomNumber) {
        result = `${userNumberFromInput} меньше загаданного числа`;
      } else {
        result = `Вы угадали, загаданное число ${userNumberFromInput}. 
        Попыток ${count}`;
        playMore = true;
      }
      // resetInput();
      userNumberFromInput = '';

      // state будет обновлятся при каждом клике Угадать
      // т.е. count++ стработает при одном клике только 1 раз
      // и обновится в state:
      return {...prevState, count, result, playMore,
        randomNumber, userNumberFromInput};
    });
  };
  // получаем новое значение и каждый раз его перезаписываем
  const handleChange = (e) => {
    setState({...state, userNumberFromInput: e.target.value});
  };

  const handleClick = (e) => {
    setState({...state,
      userNumberFromInput: '',
      count: 0,
      result: 'Результат',
      playMore: false,
      randomNumber: rN, // меняем рандомное число при клике Сыграть еще
    });
  };

  return (
    <div className={style.game}>
      <p className={style.result}>{state.result}</p>
      {!state.playMore && (
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
      )}
      {state.playMore && (
        <button className={`${style.btn} ${style.btnMore}`}
          onClick={handleClick}>Сыграть еще</button>
      )}
    </div>
  );
};

FuncComplex.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
