import {useState} from 'react';
import Input from "./Input.jsx";

import {hasMinLength, isEmail, isNotEmpty} from "../util/validation.js";

export default function Login() {

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  const isEmailInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
  const isPasswordInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);

    // TODO: Validate the input

    // TODO: Send the data to the server
  }

  function handleInputChange(event) {
    const {name, value} = event.target;
    setEnteredValues(prevState => ({
      ...prevState,
      [name]: value
    }));

    setDidEdit(prevEdit => ({
      ...prevEdit,
      [name]: false
    }));
  }

  function handleInputBlur(event) {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [event.target.name]: true
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input label="Email" id="email" type="email" name="email"
               error={isEmailInvalid && 'Please enter a valid email address.'}
               onBlur={handleInputBlur}
               onChange={handleInputChange}
               value={enteredValues.email}/>

        <Input label="Password" id="password" type="password" name="password"
               error={isPasswordInvalid && 'Password must be at least 6 characters long.'}
               onBlur={handleInputBlur}
               onChange={handleInputChange}
               value={enteredValues.password}/>

      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
