
export const DEBUG = true;

export const debugLog = (log: string, color = '#5209c5') => {
  console.groupCollapsed(`%c${log}`, `color: ${color}; font-weight: 600`);
  console.trace('trace');
  console.groupEnd();
};
