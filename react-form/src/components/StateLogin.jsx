import {useState} from 'react';

export default function Login() {

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const isEmailInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);

    // reset the form
    setEnteredValues({
      email: '',
      password: ''
    });
  }

  function handleInputChange(event) {
    const {name, value} = event.target;
    setEnteredValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={handleInputChange} value={enteredValues.email}/>
          <div className="control-error">{isEmailInvalid && <p>Please enter a valid email address.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={handleInputChange}
                 value={enteredValues.password}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
