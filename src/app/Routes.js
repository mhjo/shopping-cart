import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cart from "../features/Cart";
import Products from "../features/Products";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/products" />
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
