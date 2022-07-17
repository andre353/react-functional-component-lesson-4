import React, {useEffect} from 'react';
import style from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({text}) => {
  useEffect(() => {
    console.log('[]useEffect - button'); // при вызове компон
    return () => {
      console.log('CWU - button'); // перед демонтажем комп
    };
  }, []); // пустой массив обеспечивает разовый вызов обоих callbackов
  // но в разное время
  return <button className={style.btn}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string,
};
