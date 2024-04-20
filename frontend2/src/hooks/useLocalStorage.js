import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item || initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
}

export default useLocalStorage
