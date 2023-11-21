const Libxml = require("node-libxml");
let libxml = new Libxml();

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

module.exports = {
  validateXmlDtd,
  validateXmlXsd,
};
