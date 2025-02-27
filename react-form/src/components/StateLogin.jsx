import Input from "./Input.jsx";
import {useInput} from "../hooks/useInput";
import {hasMinLength, isEmail, isNotEmpty} from "../util/validation.js";

export default function Login() {

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: isEmailInvalid,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: isPasswordInvalid
  } = useInput('', (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: Validate the input
    if (isEmailInvalid || isPasswordInvalid) {
      return;
    }

    // TODO: Send the data to the server
    console.log(emailValue, passwordValue);
    console.log("Sending data to the server...");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input label="Email" id="email" type="email" name="email"
               error={isEmailInvalid && 'Please enter a valid email address.'}
               onBlur={handleEmailBlur}
               onChange={handleEmailChange}
               value={emailValue}/>

        <Input label="Password" id="password" type="password" name="password"
               error={isPasswordInvalid && 'Password must be at least 6 characters long.'}
               onBlur={handlePasswordBlur}
               onChange={handlePasswordChange}
               value={passwordValue}/>

      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
