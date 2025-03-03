import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from "./components/UI/Notification";
import {fetchCartData, sendCartData} from "./store/cart-actions";

let initial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  // this useEffect is used to fetch data from firebase
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // this useEffect is used to send data to firebase for every change in cart
  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification &&
        <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {showCart && <Cart/>}
        <Products/>
      </Layout>
    </Fragment>
  );
}

export default App;
