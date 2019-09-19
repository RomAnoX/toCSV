const isArray = Array.isArray;
const isObject = obj => obj instanceof Object;

const parseObject = options => {
  const { prefix = 'root', print = true } = options;
  const { data, save, config } = options;
  const header = key => config.name(`${prefix}.${key}`);
  const ignore = key => config.ignore(`${prefix}.${key}`);
  const headers = [];
  const values = [];
  const queue = [];

  if (config.ignore(prefix)) return;

  if (isArray(data)) {
    data.forEach((o, i) => parseObject({
      save, config, prefix, data: o, print: i === 0
    }));
    return;
  }

  for (let key in data) {
    if (isObject(data[key])) {
      queue.push({ prefix: `${prefix}.${key}`, data: data[key] });
    } else if (!ignore(key)) {
      if (print) headers.push(header(key));
      values.push(data[key]);
    }
  }

  if (config.name(prefix) && print) save([config.name(prefix)]);
  if (headers.length) save(headers);
  if (values.length) save(values);

  queue.forEach(o => parseObject({ save, config, print, ...o }));
};

module.exports = parseObject;
