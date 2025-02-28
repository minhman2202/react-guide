import {useContext} from "react";

import {currencyFormatter} from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Input from "./UI/Input.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={() => userProgressCtx.hideCheckout()}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="full-name"/>
        <Input label="Email Address" type="email" id="email"/>
        <Input label="Street" type="text" id="street"/>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"/>
          <Input label="City" type="text" id="city"/>
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={() => userProgressCtx.hideCheckout()}>Close</Button>
          <Button onClick={() => userProgressCtx.hideCart()}>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}