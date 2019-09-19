
module.exports = config => {
  const property = key => {
    const value = config[key] || null;
    if (typeof value === 'string') {
      return { name: value };
    }
    return value || {};
  };
  const name = key => {
    return property(key).name || key.split('.').slice(-1)[0];
  };
  const ignore = key => {
    return property(key).ignore || false;
  };

  return { name, ignore };
};
