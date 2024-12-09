export default function UserInput({userInput, onChange}) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input name="initialInvestment" type="number" required value={userInput.initialInvestment}
                 onChange={(event) => onChange(event.target.name, event.target.value)}/>
        </p>
        <p>
          <label>Annual Investment</label>
          <input name="annualInvestment" type="number" required value={userInput.annualInvestment}
                 onChange={(event) => onChange(event.target.name, event.target.value)}/>
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input name="expectedReturn" type="number" required value={userInput.expectedReturn}
                 onChange={(event) => onChange(event.target.name, event.target.value)}/>
        </p>
        <p>
          <label>Duration</label>
          <input name="duration" type="number" required value={userInput.duration}
                 onChange={(event) => onChange(event.target.name, event.target.value)}/>
        </p>
      </div>
    </section>
  )
}