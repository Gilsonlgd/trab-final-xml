<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="text()" priority="-1" />
  <xsl:output method="html" indent="yes" encoding="UTF-8" />

  <xsl:template match="/nfeProc/NFe/infNFe">
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
                  Uma dashboard simples e intuitiva para visualização de dados
                  de notas fiscais eletrônicas.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="row">
              <div class="col-12">
                <a href="index.html" class="btn btn-secondary btn-sm mb-2"> &lt;- Voltar</a>
                <h4>Painel Nota Num <xsl:value-of select="ide/nNF" /></h4>
              </div>
              <hr />
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Data da compra:</h5>
                    <p class="card-text">
                      <xsl:value-of select="./ide/dEmi" />
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Número de Produtos:</h5>
                    <p class="card-text">
                      <xsl:value-of select="count(./det)" />
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Valor Total de Produtos:</h5>
                    <p class="card-text">
                      R$: <xsl:value-of select="number(./total/*/vProd)" />
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Valor Total da Nota:</h5>
                    <p class="card-text">
                      R$: <xsl:value-of select="number(./total/*/vNF)" />
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">ISSQN Retido:</h5>
                    <p class="card-text">
                      R$: <xsl:value-of select="sum(./total/*/vISSQN)" />
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">ICMS:</h5>
                    <p class="card-text">
                      R$: <xsl:value-of select="number(./total/*/vICMS)" />
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Tributos Aprox. Total:</h5>
                    <p class="card-text">
                      R$:
                      <xsl:value-of
                        select="number(./total/*/vICMS + ./total/*/vIPI + ./total/*/vPIS + ./total/*/vCOFINS)"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Frete:</h5>
                    <p class="card-text">
                      R$: <xsl:value-of select="number(./total/*/vFrete)" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <h2>Produtos</h2>
              </div>
              <hr />
              <div class="col-12">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Quantidade</th>
                      <th scope="col">Valor Unitário</th>
                      <th scope="col">Valor Total</th>
                      <th scope="col">ICMS</th>
                      <th scope="col">IPI</th>
                      <th scope="col">PIS</th>
                      <th scope="col">COFINS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="./det">
                      <tr>
                        <td>
                          <xsl:value-of select="./prod/cProd" />
                        </td>
                        <td>
                          <xsl:value-of select="./prod/xProd" />
                        </td>
                        <td>
                          <xsl:value-of select="./prod/qCom" />
                        </td>
                        <td>R$: <xsl:value-of select="number(./prod/vUnCom)" /></td>
                        <td>R$: <xsl:value-of select="number(./prod/vProd)" /></td>
                        <td>R$: <xsl:value-of select="sum(./imposto/ICMS/*/vICMS)" /></td>
                        <td>R$: <xsl:value-of select="sum(./imposto/IPI/*/vIPI)" /></td>
                        <td>R$: <xsl:value-of select="sum(./imposto/PIS/*/vPIS)" /></td>
                        <td>R$: <xsl:value-of select="sum(./imposto/COFINS/*/vCOFINS)" /></td>   
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
