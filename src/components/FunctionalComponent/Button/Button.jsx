import React, {useEffect} from 'react';
import style from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({text}) => {
  useEffect(() => {
    console.log('[]useEffect - из Button'); // при вызове компон
    return () => {
      console.log('CWU - из Button'); // перед демонтажем комп
    };
  }, []); // пустой массив обеспечивает разовый вызов обоих callbackов
  // но в разное время
  return <button className={style.btn}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string,
};
