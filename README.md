> [!NOTE]
> Este documento encontra-se em contínua elaboração e poderá sofrer alterações futuras.

# Sistema Genérico de Gerenciamento de Inventário

Este repositório hospeda o código-fonte da aplicação desenvolvida para o projeto final da disciplina de **Desenvolvimento de Aplicações Web**.

### Integrantes do Grupo

| Nome Completo | Prontuário |
| :--- | :--- |
| Mateus G. P. Campos | JC3019705 |
|  | JC3018784 |
| Ray G. dos S. Martins | JC3019543 |
| Kauê M. de Araujo | JC3019497 |

---

## Descrição do Projeto

**Estoque** é uma aplicação web completa, desenvolvida para demonstrar o emprego de conceitos apurados ao decorrer do ano na disciplina de Desenvolvimento de Aplicações Web.

O sistema permite o gerenciamento de:
*   **Entidades Centrais:** Usuários, Categorias e Produtos
*   **Controle de Acesso:** Autenticação de usuários implementada desde o princípio para proteger rotas e funcionalidades sensíveis.
*   **Relatórios:** Geração de consultas com JOINs e uso de chaves estrangeiras para visualização do elementos pertinentes.

---

## Conjunto de tecnologias, ferramentas e frameworks

A aplicação foi construída utilizando a seguinte pilha tecnológica, conforme os requisitos do projeto:

| Categoria              | Tecnologia                   | Descrição                                                                                                             |
| :---                   | :---                         | :---                                                                                                                  |
| **Front end**          | EJS + Bootstrap + JavaScript | Engine de template para renderização dinâmica, com Bootstrap para design responsivo e JavaScript para interatividade. |
| **Back end**           | Node.js + Express.js         | Ambiente de execução e framework web minimalista para o servidor.                                                     |
| **Banco de Dados**     | SQLite3 + Sequelize          | Banco de dados leve e baseado em arquivo, com Sequelize como ORM para modelagem e operações de banco de dados.        |
| **Autenticação**       | express-session + bcrypt     | Gerenciamento de sessão para controle de acesso e hashing seguro de senhas.                                           |
| **Controle de Versão** | Git + GitHub                 | Sistema de controle de versão distribuído e plataforma de hospedagem de código.                                       |

---

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

*   Node.js (versão LTS recomendada)
*   Git

### 1. Clonar o Repositório

```bash
git clone https://github.com/mgpcampos/estoque.git
cd estoque/
```

### 2. Instalar Dependências

Instale todas as dependências do projeto listadas no `package.json`:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Incluir o arquivo `.env` em um repositório público é tido como uma grave falha de segurança. Contudo, para efeitos de demonstração, o repositório atual o contém. Não é necessário alterar as variáveis de ambiente presentes em `.env`, porém é possível.

```
# Exemplo de conteúdo para o arquivo .env
PORT=3000
SESSION_SECRET="sua_chave_secreta_aqui"
# O Sequelize criará o arquivo do banco de dados SQLite automaticamente
DB_FILE=./database/database.sqlite
```

### 4. Iniciar a Aplicação

Inicie o servidor Node.js:

```bash
npm run start
```

A aplicação estará acessível em `http://localhost:3000` (ou na porta configurada no seu `.env`).

---

## Estrutura do Projeto

A estrutura do projeto segue o padrão MVC (Model-View-Controller):

```
.
├── node_modules/
├── public/                 # Arquivos estáticos (CSS, JS do cliente, imagens)
├── src/
│   ├── config/             # Configurações do ambiente e do banco de dados
│   ├── controllers/        # Lógica de manipulação de requisições (Controllers)
│   ├── models/             # Definições de modelos Sequelize e lógica de acesso a dados (Models)
│   ├── routes/             # Definição das rotas da aplicação
│   ├── views/              # Templates EJS (Views)
│   ├── middlewares/        # Funções de middleware (autenticação, autorização, validação)
│   └── services/           # Lógica de negócio complexa
├── .env                    # Variáveis de ambiente (não versionado)
├── package.json
├── README.md               # Este arquivo
└── PROPOSTA.md             # Documento de Proposta do Projeto
```