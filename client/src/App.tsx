import {BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AuthRouter from './router/AuthRouter';

const isUserLoggedIn = false;

function App() {
  return (
    <BrowserRouter>
      {isUserLoggedIn ? <AppRouter /> : <AuthRouter />}
    </BrowserRouter>
  );
}

export default App;
