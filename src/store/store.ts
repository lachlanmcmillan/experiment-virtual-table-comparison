import { useSyncExternalStore } from "react";

export const createStore = <T>(initialState: T) => {
  let state = initialState;
  let subscribers: (() => void)[] = [];

  const setState = (newState: T) => {
    state = newState;
    subscribers.forEach((callback) => callback());
  };

  const getState = (): T => state;

  const subscribe = (callback: () => void) => {
    subscribers.push(callback);

    return () => {
      subscribers = subscribers.filter((c) => c !== callback);
    }
  }

  const use = () => useSyncExternalStore(subscribe, getState, getState);

  return {
    getState,
    setState,
    use,
  }
}
