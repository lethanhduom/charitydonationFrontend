import React, { useEffect, useState } from 'react';

const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 50);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        start = end;
      }
      setCount(Math.ceil(start));
    }, 50);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default Counter;
