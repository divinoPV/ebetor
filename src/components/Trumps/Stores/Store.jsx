import { AuthenticationProvider } from './Authentication/store';
import { BetProvider } from './Bet/store';

const Store = ({ children }) => <AuthenticationProvider>
  <BetProvider>
    {children}
  </BetProvider>
</AuthenticationProvider>;

export default Store;
