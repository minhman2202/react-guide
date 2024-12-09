import {useState} from "react";

export default function UserInput() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setUserInput(prevUserInput => ({
      ...prevUserInput,
      [name]: value,
    }));
  }

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input name="initialInvestment" type="number" required value={userInput.initialInvestment}
                 onChange={handleChange}/>
        </p>
        <p>
          <label>Annual Investment</label>
          <input name="annualInvestment" type="number" required value={userInput.annualInvestment}
                 onChange={handleChange}/>
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input name="expectedReturn" type="number" required value={userInput.expectedReturn} onChange={handleChange}/>
        </p>
        <p>
          <label>Duration</label>
          <input name="duration" type="number" required value={userInput.duration} onChange={handleChange}/>
        </p>
      </div>
    </section>
  )
}