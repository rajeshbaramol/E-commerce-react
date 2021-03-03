import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import LoginComponent from './pages/LoginComponent';
import ProductList from './pages/ProductList';
import { UserCart } from './pages/UserCart';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
        <Route path='/login' component={LoginComponent} />
          {localStorage.getItem('token')!==undefined && [
            <Route>
              <Route path='/products' component={ProductList} />
              <Route path='/cart' component={UserCart} />
              <Redirect to='/products' />
            </Route>,
          ]}
          <Redirect to='/login' />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
