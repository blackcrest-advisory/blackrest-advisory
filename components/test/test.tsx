"use client";

import React, { useRef, useState } from "react";

export const Test = () => {
  const renderCount = useRef(1);
  const [count, setCount] = useState(0);



  return (
    <div>
      <h2>Count: {count}</h2>
      {/* <h2>Rendered: {renderCount.current} times</h2> */}

      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};
