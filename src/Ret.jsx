import { useEffect, useRef, useState } from 'react';

export default function Ret() {
  const [state, setState] = useState(null);
  const ref = useRef(0);
  useEffect(() => {
    console.log(state);
  }, [state]);
  const plus = () => {
    setState((prev) => prev + 1);
    ref.current += 1;
  };
  return (
    <div>
      <span>{state}</span>
      <button type="button" onClick={plus}>
        {ref.current}
      </button>
    </div>
  );
}
