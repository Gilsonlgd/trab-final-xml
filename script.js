const { readFile, readDirectoryFiles } = require("./helpers/fileHelper");
const { validateXmlDtd, validateXmlXsd } = require("./helpers/xmlHelper");

function checkInvoicesValidation(validations) {
  const invalid_invoices = validations.filter(
    (validation) => validation.err !== null
  );
  const valid_invoices = validations.filter(
    (validation) => validation.err === null
  );

  console.log(
    `There are ${invalid_invoices.length} invalid invoices and ${valid_invoices.length} valid invoices.`
  );

  if (invalid_invoices.length > 0) {
    console.log("Invalid invoices:");
    invalid_invoices.forEach((invoice) => {
      console.log(`Invoice ${invoice.id} - ${invoice.name}`);
      console.log(invoice.err);
    });
  }

  return invalid_invoices.length === 0;
}

async function readInvoices() {
  const files_names = await readDirectoryFiles("./notas");
  const files = await Promise.all(
    files_names.map(async (file_name, index) => ({
      content: await readFile(`./notas/${file_name}`),
      name: file_name,
      id: index + 1,
    }))
  );

  return files;
}

async function validateInvoicesAgainstDTD(invoices, dtd_path) {
  const validations = await Promise.all(
    invoices.map(async (invoice) => {
      try {
        await validateXmlDtd(invoice.content, dtd_path);
        return { id: invoice.id, name: invoice.name, err: null };
      } catch (err) {
        return { id: invoice.id, name: invoice.name, err };
      }
    })
  );

  return validations;
}

async function validateInvoicesAgainstXSD(invoices, xsd_path) {
  const validations = await Promise.all(
    invoices.map(async (invoice) => {
      try {
        await validateXmlXsd(invoice.content, xsd_path);
        return { id: invoice.id, name: invoice.name, err: null };
      } catch (err) {
        return { id: invoice.id, name: invoice.name, err };
      }
    })
  );

  return validations;
}

async function script() {
  const invoices = await readInvoices();

  let validations = await validateInvoicesAgainstDTD(invoices, "./notas.dtd");
  const dtdValidation = checkInvoicesValidation(validations);

  validations = await validateInvoicesAgainstXSD(invoices, "./notas.xsd");
  const xsdValidation = checkInvoicesValidation(validations);

  
}

script();
