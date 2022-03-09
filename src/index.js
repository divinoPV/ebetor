import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Router from './components/Trumps/Router';

import './style/ebetor.scss';
import Store from './components/Trumps/Stores/Store';

ReactDOM.render(
  <Store>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Store>,
  document.getElementById('ebetor')
);
