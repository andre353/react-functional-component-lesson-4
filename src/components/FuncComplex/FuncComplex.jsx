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
  });

  const [result, setResult] = useState('Результат');
  const [randomNumber] = useState(
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  console.log(state.userNumberFromInput, randomNumber, state.count);

  const handleSubmit = e => {
    e.preventDefault();

    // устанавливаем значение count - старое значение перетирается новым
    // а новое образуется суммированием со старым
    setState((prevState) => ({...prevState, count: state.count + 1}));

    setResult(() => {
      if (!state.userNumberFromInput ||
        state.userNumberFromInput < min ||
        state.userNumberFromInput > max) {
        return `Введите число от ${min} до ${max}`;
      }

      if (state.userNumberFromInput > randomNumber) {
        return `${state.userNumberFromInput} больше загаданного числа`;
      }

      if (state.userNumberFromInput < randomNumber) {
        return `${state.userNumberFromInput} меньше загаданного числа`;
      }

      return `Вы угадали, загаданное число ${state.userNumberFromInput}. 
      Попыток ${state.count}`; // ЗДЕСЬ БУДЕТ СТАРОЕ ЗНАЧЕНИЕ COUNT,
      // Т.К. НОВОЕ из setState ЕЩЕ В STACK и не успело сюда попасть
    });
  };
  // получаем новое значение и каждый раз его перезаписываем
  const handleChange = (e) => {
    setState({...state, userNumberFromInput: e.target.value});
  };

  return (
    <div className={style.game}>
      <p className={style.result}>{result}</p>
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
