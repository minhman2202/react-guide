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

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting checkout...');

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    // {email: test@example.com, full-name: John Doe, street: 123 Main St, postal-code: 12345, city: Anytown}

    console.log(customerData);

    // send HTTP request to server
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData
        }
      })
    });
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={() => userProgressCtx.hideCheckout()}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name"/>
        <Input label="Email Address" type="email" id="email"/>
        <Input label="Street" type="text" id="street"/>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"/>
          <Input label="City" type="text" id="city"/>
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={() => userProgressCtx.hideCheckout()}>Close</Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}