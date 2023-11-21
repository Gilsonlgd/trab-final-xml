const Libxml = require("node-libxml");
let libxml = new Libxml();

const xpath = require("xpath"),
  dom = require("xmldom").DOMParser;

const validateXmlDtd = async (xml, dtd_path) => {
  return new Promise((resolve, reject) => {
    libxml.loadXmlFromString(xml);
    libxml.loadDtds([dtd_path]);

    const validation = libxml.validateAgainstDtds();
    if (validation) {
      resolve(!!validation);
    } else {
      reject(libxml.validationDtdErrors);
    }
  });
};

const validateXmlXsd = async (xml, xsd_path) => {
  return new Promise((resolve, reject) => {
    libxml.loadXmlFromString(xml);
    libxml.loadSchemas([xsd_path]);

    const validation = libxml.validateAgainstSchemas();
    if (validation) {
      resolve(!!validation);
    } else {
      reject(libxml.validationSchemaErrors);
    }
  });
};

const xPathQuery = async (xml, query) => {
  return new Promise((resolve, reject) => {
    var doc = new dom().parseFromString(xml);
    var result = xpath.select(query, doc);
    resolve(result);
  });
};

const nodeXPathQuery = (query, node) => {
  var result = xpath.select(query, node);
  return result;
};

const toDom = (xml) => {
  return new dom().parseFromString(xml);
};

module.exports = {
  validateXmlDtd,
  validateXmlXsd,
  xPathQuery,
  nodeXPathQuery,
  toDom,
};
