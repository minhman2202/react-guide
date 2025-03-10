import {useContext, useActionState} from "react";

import {currencyFormatter} from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Input from "./UI/Input.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import Error from "./Error.jsx";

const requestConfig = {
  method: 'POST', headers: {
    'Content-Type': 'application/json'
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const {
    data,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/orders', requestConfig);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    console.log('Submitting checkout...');
    const customerData = Object.fromEntries(fd.entries());
    // {email: test@example.com, full-name: John Doe, street: 123 Main St, postal-code: 12345, city: Anytown}

    console.log(customerData);

    // send HTTP request to server
    await sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData
      }
    }));
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>Close</Button>
      <Button>Submit Order</Button>
    </>);
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
      <h2>Success!</h2>
      <p>Your order has been received.</p>
      <p>We will get back to you with more details via email within the next few minutes.</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name"/>
        <Input label="Email Address" type="email" id="email"/>
        <Input label="Street" type="text" id="street"/>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"/>
          <Input label="City" type="text" id="city"/>
        </div>

        {error && <Error title="Failed to send order" message={error}/>}

        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>);
}