import React from 'react';
import {FuncComplex} from './components/FuncComplex/FuncComplex';
import FunctionalComponent from './components/FunctionalComponent';

export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <FuncComplex min={1} max={10} />
        <FunctionalComponent min={1} max={10} />
      </div>
    );
  }
}
