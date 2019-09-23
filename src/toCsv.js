const configuration = require('./configuration');
const parse = require('./parse');

module.exports = function(data, options = {}) {
  const csvData = [];
  const config = configuration(options);
  const save = values => csvData.push(values);

  parse({ data, config, save });

  return csvData;
};
