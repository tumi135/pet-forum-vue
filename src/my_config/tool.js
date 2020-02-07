var tools = {
  debounce(fn, wait) {
    let timeout;
    wait = wait || 500;
    return function() {
      const context = this;
      const args = arguments;

      if (!timeout) {
        fn.apply(context, args);
        timeout = setTimeout(function() {
          timeout = null;
        }, wait);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
        }, wait);
      }
    };
  },
  throttle(fn, wait) {
    let timeout;
    wait = wait || 500

    return function() {
      const context = this;
      const args = arguments;

      if (!timeout) {
        fn.apply(context, args);
        timeout = setTimeout(function() {
          timeout = null;
        }, wait);
      }
    };
  }
};
export default tools;
