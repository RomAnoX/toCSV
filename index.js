const configuration = require('./configuration');
const parseObject = require('./parseObject');

module.exports = function(data, options = {}) {
  const csvData = [];
  const config = configuration(options);
  const save = values => csvData.push(values);

  parseObject({ data, config, save });

  return csvData;
};
