import React from 'react';
import ReactDOM from 'react-dom';
import MainInterface from './MainInterface';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainInterface />, div);
  ReactDOM.unmountComponentAtNode(div);
});
