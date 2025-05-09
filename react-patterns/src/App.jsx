import Accordion from "./components/Accordion/Accordion.jsx";

function App() {
  return <main>
    <section>
      <h2>Why work with us?</h2>

      <Accordion className="accordion">
        <Accordion.Item id="experience" className="accordion-item" title="We got 20 years of experience">
          <article>
            <p>You can&apos;t go wrong with us.</p>
            <p>We are in the business of planning highly individualized vacation trips for more than 20 years.</p>
          </article>
        </Accordion.Item>
        <Accordion.Item id="local-guides" className="accordion-item" title="We are working with the best local guides.">
          <article>
            <p>We are not doing this alone from our office.</p>
            <p>Instead, we are working with local guides to ensure a safe and pleasant vacation.</p>
          </article>
        </Accordion.Item>
      </Accordion>
    </section>
  </main>;
}

export default App;
