import { useState } from 'react';

export const useSetState = (initialState = {}, callback = () => { }) => {
  const [state, set] = useState(initialState);
  const setState = (patch, callback) => {
    set((prevState) => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
    callback instanceof Function && callback();
  }
  return [state, setState];
}