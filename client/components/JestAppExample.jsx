import React, { useState } from 'react';

const JestAppExample = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello from the React App</h1>
      <button type="button" onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};

export default JestAppExample;
