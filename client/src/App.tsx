import {BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AuthRouter from './router/AuthRouter';
import {useAppSelector} from './core/store/store';
import {selectIsUserAuthenticated} from './core/store/slices/auth.slice';
import useAuthInitializer from './core/hooks/useAuthInitializer';

function App() {
  useAuthInitializer();
  const isUserAuthenticated = useAppSelector(selectIsUserAuthenticated);
  return (
    <BrowserRouter>
      {isUserAuthenticated ? <AppRouter /> : <AuthRouter />}
    </BrowserRouter>
  );
}

export default App;
