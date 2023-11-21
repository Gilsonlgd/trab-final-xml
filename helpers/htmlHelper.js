const generateIndexHtml = (
  productsCount,
  invoicesCount,
  invoicesSummary,
  lowPriceProduct,
  highTaxInvoice
) => {
  const htmlContent = `
  <html>
    <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      />
      <link rel="stylesheet" type="text/css" href="./style.css" />
      <title>NFe Dashboard</title>
    </head>

    <body>
      <div class="container p-4">
        <div class="custom-header">
          <div class="row">
            <div class="col-12 text-center">
              <img src="./logo.png" alt="Logo" style="width: 50px" />
              <h1>NFe Dashboard</h1>
              <p class="text-bold" style="opacity: 60%">
                Uma dashboard simples e intuitiva para visualização de dados de
                notas fiscais eletrônicas.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="row mt-4">
            <div class="col-12">
              <h4>Painel</h4>
            </div>
            <hr />
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Número de Notas:</h5>
                  <p class="card-text">${invoicesCount}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Número de Produtos:</h5>
                  <p class="card-text">${productsCount}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Valor Total de Produtos:</h5>
                  <p class="card-text">R$: ${invoicesSummary.totalProducts
                    .toFixed(2)
                    .replace(".", ",")}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Valor Total da Notas:</h5>
                  <p class="card-text">R$: ${invoicesSummary.totalNfeValue
                    .toFixed(2)
                    .replace(".", ",")}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">ISSQN Retido:</h5>
                  <p class="card-text">R$: ${invoicesSummary.totalIssQN
                    .toFixed(2)
                    .replace(".", ",")}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">ICMS:</h5>
                  <p class="card-text">R$: ${invoicesSummary.totalIcms
                    .toFixed(2)
                    .replace(".", ",")}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Tributos Aprox. Total:</h5>
                  <p class="card-text">R$: ${invoicesSummary.totalAproxTaxes
                    .toFixed(2)
                    .replace(".", ",")}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-3 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Frete Total:</h5>
                  <p class="card-text">R$: ${invoicesSummary.totalFreight
                    .toFixed(2)
                    .replace(".", ",")}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Produto de menor preço:</h5>
                  <p class="card-text">
                    <ul> 
                      <li>Descrição: ${lowPriceProduct.description}</li>
                      <li>Código: ${lowPriceProduct.code}</li>
                      <li>Quantidade: ${lowPriceProduct.quantity}</li>
                      <li>Preço Un: R$: ${lowPriceProduct.unitPrice
                        .toFixed(2)
                        .replace(".", ",")}
                      </li>
                      <li>Preço Total: R$: ${lowPriceProduct.totalPrice
                        .toFixed(2)
                        .replace(".", ",")}
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Nota de maior imposto:</h5>
                  <p class="card-text">
                    <ul> 
                      <li>Emissor: ${highTaxInvoice.emit}</li>
                      <li>Número: ${highTaxInvoice.number}</li>
                      <li>Data: ${highTaxInvoice.date}</li>
                      <li>Valor total da nota: R$: ${highTaxInvoice.total
                        .toFixed(2)
                        .replace(".", ",")}
                      </li>
                      <li>Valor total de impostos: R$: ${highTaxInvoice.totalTax
                        .toFixed(2)
                        .replace(".", ",")}
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12">
              <h4>Notas:</h4>
            </div>
            <hr />
            <div class="d-flex col-12 flex-column">
              <ul id="xml_files">
                <li class="list-item">
                  <a href="./nota1.html">Nota 1</a>
                </li>
                <li class="list-item">
                  <a href="./nota2.html">Nota 2</a>
                </li>
                <li class="list-item">
                  <a href="./nota3.html">Nota 3</a>
                </li>
                <li class="list-item">
                  <a href="./nota4.html">Nota 4</a>
                </li>
                <li class="list-item">
                  <a href="./nota5.html">Nota 5</a>
                </li>
                <li class="list-item">
                  <a href="./nota6.html">Nota 6</a>
                </li>
              </ul>
            </div>
          </div>

          <hr class="mt-4" />
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  </html>`;

  return htmlContent;
};

module.exports = { generateIndexHtml };
