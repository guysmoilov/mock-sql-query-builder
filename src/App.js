import './App.css';
import Condition from './Condition';
import React, { useState } from 'react';

function App() {
  const [rootCondition, setRootCondition] = useState({
    type: 'AND',
    conditions: []
  });

  return (
    <div className="App">
      <h1>SQL WHERE Editor</h1>
      <Condition condition={rootCondition} onChange={setRootCondition} />
      <pre>{JSON.stringify(rootCondition, null, 2)}</pre>
    </div>
  );
}

export default App;
