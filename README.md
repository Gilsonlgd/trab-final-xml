# NFe Dashboard

Bem-vindo ao NFe Dashboard, um projeto Node.js que utiliza JavaScript com XML para criar um painel de controle para Notas Fiscais Eletrônicas.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js instalado em seu computador.

Siga o passo a passo deste tutorial para instalar do Node!  
**ATENÇÃO**: durante a instalação do Node no **Windows**, marque a opção **"Automatically install the necessary tools"** para instalar as ferramentas necessárias para o projeto.  
https://balta.io/blog/node-npm-instalacao-configuracao-e-primeiros-passos

Além disso, dependendo do seu sistema operacional, você precisará instalar:
### No Linux

   * [Uma versão suportada do Python](https://devguide.python.org/versions/)
   * `make`
   * Compilador C/C++, como [GCC](https://gcc.gnu.org)

### No macOS

   * [Uma versão suportada do Python](https://devguide.python.org/versions/)
   * `Xcode Command Line Tools` que instala `clang`, `clang++`, and `make`.
     * Instalar o `Xcode Command Line Tools` rodando `xcode-select --install`. -- ou --
     * Se você já tem o [full Xcode instalado](https://developer.apple.com/xcode/download/), você pode instalar o Command Line Tools pelo menu `Xcode -> Open Developer Tool -> More Developer Tools...`.


### No Windows

* Instalar a última [versão do Python](https://devguide.python.org/versions/) pela
[Microsoft Store](https://apps.microsoft.com/store/search?publisher=Python+Software+Foundation).

## Instalação

1. Navegue até a raiz do projeto em seu terminal.

```bash
cd trab-final-xml
```

2. Instale as dependências do projeto usando o npm (Node Package Manager).

```bash
npm install
```

## Executando o Projeto

Após a instalação das dependências, você pode executar o projeto da seguinte maneira:

```bash
node script.js
```

Isso rodará o script de criação das páginas

## Abrindo as páginas
As páginas estão armazenadas no diretório /html, dentro da pasta principal.
Para abrir a página inicial, abra o arquivo "index.html" dentro deste diretório.

Pronto! Você já pode navegar pelas páginas.