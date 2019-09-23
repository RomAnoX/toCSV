const parse = options => {
  const { prefix = 'root', print = true } = options;
  const { data, save, config } = options;
  const isObject = obj => obj instanceof Object;
  const ignoreOnEmpty = key => config.ignoreOnEmpty(`${prefix}.${key}`);
  const ignore = key => config.ignore(`${prefix}.${key}`);
  const header = key => config.name(`${prefix}.${key}`);
  const value = (key, v) => config.value(`${prefix}.${key}`, v);
  const headers = [];
  const values = [];
  const queue = [];

  if (config.ignore(prefix)) return;

  if (Array.isArray(data)) {
    data.forEach((o, i) => parse({
      save, config, prefix, data: o, print: i === 0
    }));
    return;
  }

  for (let key in data) {
    if (config.only(prefix) && !config.only(prefix).includes(key)) continue;
    if (isObject(data[key])) {
      queue.push({ prefix: `${prefix}.${key}`, data: data[key] });
    } else if (!ignore(key)) {
      const keyValue = value(key, data[key]);
      if (ignoreOnEmpty(key) && !keyValue) continue;
      if (print) headers.push(header(key));
      values.push(keyValue);
    }
  }

  if (print && !config.hide(prefix)) save([config.name(prefix)]);
  if (headers.length) save(headers);
  if (values.length) save(values);

  queue.forEach(o => parse({ save, config, print, ...o }));
};

module.exports = parse;
