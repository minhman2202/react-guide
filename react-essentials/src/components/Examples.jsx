import React, { useState } from 'react';
import { EXAMPLES } from '../data.js';
import Section from './Section.jsx';
import Tabs from './Tabs.jsx';
import TabButton from './TabButton.jsx';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  function handleSelect(content) {
    setSelectedTopic(content);
  }
  return (
    <Section id="examples" title="Examples">
      <Tabs buttons={<>
        <TabButton isSelected={selectedTopic === 'components'} onSelect={() => handleSelect("components")}>Components</TabButton>
        <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => handleSelect("jsx")}>JSX</TabButton>
        <TabButton isSelected={selectedTopic === 'props'} onSelect={() => handleSelect("props")}>Props</TabButton>
        <TabButton isSelected={selectedTopic === 'state'} onSelect={() => handleSelect("state")}>State</TabButton>
      </>}>

        <div id="tab-content">
          {selectedTopic ? (
            <>
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </>
          ) : (
            <p>Please select a topic.</p>
          )}
        </div>
      </Tabs>

    </Section>
  );
}