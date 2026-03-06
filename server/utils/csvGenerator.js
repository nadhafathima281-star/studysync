const { Parser } = require("json2csv");

exports.generateCSV = (data, fields) => {

  if (!data || data.length === 0) {
    return "No data available";
  }

  const parser = new Parser({ fields });

  return parser.parse(data);

};