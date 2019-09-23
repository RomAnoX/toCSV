module.exports = options => {
  const isFunction = fn => fn && {}.toString.call(fn) === '[object Function]';
  const property = key => {
    const config = options[key] || {};
    return typeof config === 'string' ? { name: config } : config;
  };

  return {
    name(key) {
      return property(key).name || key.split('.').slice(-1)[0];
    },
    value(key, data) {
      if (isFunction(property(key).transform)) {
        return property(key).transform(data);
      }
      return data;
    },
    ignore(key) {
      return property(key).ignore || false;
    }
  };
};
