import { useState } from 'react';

// Force a rerender of a component
function useForceUpdate() {
  console.debug('useForceUpdate Hook');

  const [ value, setValue ] = useState(0);

  // update the state to force render
  return () => setValue((value) => value + 1);
}

export default useForceUpdate;
