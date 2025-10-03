const jsontoxml = require('jsontoxml');

const toXml = (data) => {
  return jsontoxml({ response: data }, { xmlHeader: true, indent: "  " });
};

module.exports = toXml;