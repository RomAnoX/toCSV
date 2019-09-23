module.exports = options => {
  const isFunction = fn => fn && {}.toString.call(fn) === '[object Function]';
  const isString = str => typeof str === 'string';
  const property = key => {
    const config = options[key] || {};
    return isString(config) ? { name: config } : config;
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
    only(key) {
      let list = property(key).only || null;
      return isString(list) ? [list] : list;
    },
    ignore(key) {
      return property(key).ignore || false;
    },
    ignoreOnEmpty(key) {
      if (options.ignoreOnEmpty) return true;
      return property(key).ignoreOnEmpty || false;
    },
    hide(key) {
      return property(key).hide || false;
    }
  };
};
