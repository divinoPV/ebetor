import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AuthenticationProvider } from './components/Trumps/Stores/Authentication/store';
import Router from './components/Trumps/Router';

import './style/ebetor.scss';

ReactDOM.render(
  <AuthenticationProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AuthenticationProvider>,
  document.getElementById('ebetor')
);
