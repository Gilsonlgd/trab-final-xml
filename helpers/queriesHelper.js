const { xPathQuery, nodeXPathQuery, toDom } = require("./xmlHelper");
const xpath = require("xpath");

const countAllProducts = async (invoices) => {
  const products = await Promise.all(
    invoices.map(async (invoice) => {
      const count = await xPathQuery(invoice.content, "count(//prod)");
      return count;
    })
  );

  return products.reduce((acc, curr) => acc + curr, 0);
};

const getProductWithLowestPrice = async (invoices) => {
  // "//prod[vProd = min(//prod/vProd)]"
  const products = await Promise.all(
    invoices.map(async (invoice) => {
      const productNodes = await xPathQuery(invoice.content, "//prod");

      let minVProd = Infinity;
      let minVProdProduct = null;

      for (const productNode of productNodes) {
        const vProdValue = parseFloat(
          nodeXPathQuery("number(vProd)", productNode).toString()
        );

        if (vProdValue < minVProd) {
          minVProd = vProdValue;
          minVProdProduct = productNode;
        }
      }

      return minVProdProduct;
    })
  );

  const minProd = products.reduce((acc, curr) => {
    const currVProd = parseFloat(
      nodeXPathQuery("number(vProd)", curr).toString()
    );
    const accVProd = parseFloat(
      nodeXPathQuery("number(vProd)", acc).toString()
    );

    return currVProd < accVProd ? curr : acc;
  });

  return minProd;
};

const getInvoiceWithHeighestTax = async (invoices) => {
  const taxes = await Promise.all(
    invoices.map(async (invoice) => {
      const tax = await xPathQuery(
        invoice.content,
        "number(//total/*/vICMS + //total/*/vIPI + //total/*/vPIS + //total/*/vCOFINS)"
      );
      return tax;
    })
  );

  const maxTax = taxes.reduce((acc, curr) => (acc > curr ? acc : curr), 0);

  let maxTaxInvoice = null;
  for (const invoice of invoices) {
    const tax = await xPathQuery(
      invoice.content,
      "number(//total/*/vICMS + //total/*/vIPI + //total/*/vPIS + //total/*/vCOFINS)"
    );

    if (tax === maxTax) {
      maxTaxInvoice = invoice;
      break;
    }
  }

  return toDom(maxTaxInvoice.content);
};

const getTaxesSummary = async (invoices) => {
  const icms = await Promise.all(
    invoices.map(async (invoice) => {
      const tax = await xPathQuery(invoice.content, "sum(//total/*/vICMS)");
      return tax;
    })
  );

  const issQN = await Promise.all(
    invoices.map(async (invoice) => {
      const tax = await xPathQuery(
        invoice.content,
        "sum(//det/imposto/ISSQN/*/vISSQN)"
      );
      return tax;
    })
  );

  const aproxTaxes = await Promise.all(
    invoices.map(async (invoice) => {
      const tax = await xPathQuery(
        invoice.content,
        "number(//total/*/vICMS + //total/*/vIPI + //total/*/vPIS + //total/*/vCOFINS)"
      );
      return tax;
    })
  );

  const freight = await Promise.all(
    invoices.map(async (invoice) => {
      const tax = await xPathQuery(invoice.content, "sum(//total/*/vFrete)");
      return tax;
    })
  );

  const products = await Promise.all(
    invoices.map(async (invoice) => {
      const tax = await xPathQuery(invoice.content, "sum(//total/*/vProd)");
      return tax;
    })
  );

  const nfeValue = await Promise.all(
    invoices.map(async (invoice) => {
      const tax = await xPathQuery(invoice.content, "sum(//total/*/vNF)");
      return tax;
    })
  );

  const totalIcms = icms.reduce((acc, curr) => acc + curr, 0);
  const totalIssQN = issQN.reduce((acc, curr) => acc + curr, 0);
  const totalAproxTaxes = aproxTaxes.reduce((acc, curr) => acc + curr, 0);
  const totalFreight = freight.reduce((acc, curr) => acc + curr, 0);
  const totalProducts = products.reduce((acc, curr) => acc + curr, 0);
  const totalNfeValue = nfeValue.reduce((acc, curr) => acc + curr, 0);

  return {
    totalIcms,
    totalIssQN,
    totalAproxTaxes,
    totalFreight,
    totalProducts,
    totalNfeValue,
  };
};

const getProductSummary = (prod) => {
  const code = nodeXPathQuery("cProd", prod).toString();
  const description = nodeXPathQuery("xProd", prod).toString();
  const quantity = nodeXPathQuery("number(qCom)", prod);
  const unitPrice = nodeXPathQuery("number(vUnCom)", prod);
  const totalPrice = nodeXPathQuery("number(vProd)", prod);

  return {
    code,
    description,
    quantity,
    unitPrice,
    totalPrice,
  };
};

const getInvoiceSummary = (invoice) => {
  const number = nodeXPathQuery("number(//ide/nNF)", invoice);
  const date = nodeXPathQuery("string(//ide/dEmi)", invoice);
  const total = nodeXPathQuery("number(//total/*/vNF)", invoice);
  const emit = nodeXPathQuery("string(//emit/xNome)", invoice);
  const dest = nodeXPathQuery("string(//dest/xNome)", invoice);
  const numProducts = nodeXPathQuery("count(//prod)", invoice);
  const totalTax = nodeXPathQuery(
    "number(//total/*/vICMS + //total/*/vIPI + //total/*/vPIS + //total/*/vCOFINS)",
    invoice
  );

  return {
    number,
    date,
    total,
    totalTax,
    emit,
    dest,
    numProducts,
  };
};

module.exports = {
  countAllProducts,
  getTaxesSummary,
  getProductWithLowestPrice,
  getInvoiceWithHeighestTax,
  getProductSummary,
  getInvoiceSummary,
};
