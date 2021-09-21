// Utility to throttle mouse wheel, scroll and pointer events
const throttler = (callback, limit) => {
  let wait = false;

  return (...args) => {
    if (!wait) {
      callback(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
};

export default throttler;
