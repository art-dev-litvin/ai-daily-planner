import React from "react";

export const useDebounceFunc = <Args extends unknown[]>(
  func: (...args: Args) => void,
  timeout: number,
) => {
  const timer = React.useRef<NodeJS.Timeout>(undefined);

  const funcRef = React.useRef(func);

  React.useEffect(() => {
    funcRef.current = func;
  }, [func]);

  const deboundedFunc = React.useCallback(
    (...args: Args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        funcRef.current(...args);
      }, timeout);
    },
    [timeout],
  );

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return deboundedFunc;
};
