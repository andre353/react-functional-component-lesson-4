import React from 'react';
import FunctionalComponent from './components/FunctionalComponent';

export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <FunctionalComponent min={1} max={10} />
      </div>
    );
  }
}
