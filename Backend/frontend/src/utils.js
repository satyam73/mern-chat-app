function debounce(callback, interval = 500) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, interval);
  }
}

function throttle(callback, duration = 500) {
  let timeout;

  return (...args) => {
    // if (timeout) return;

    timeout = setTimeout(() => {
      callback.apply(this, args);
      clearTimeout(timeout);
    }, duration)
  }
}

export { debounce, throttle };