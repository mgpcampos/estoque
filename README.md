# Estoque

Este repositório hospeda o código-fonte da aplicação desenvolvida para o projeto final da disciplina de **Desenvolvimento de Aplicações Web**.

### Integrantes do Grupo

| Nome Completo         | Prontuário |
| :---                  | :---       |
| Mateus G. P. Campos   | JC3019705  |
| Kevin L. R. de Candia | JC3018784  |
| Ray G. dos S. Martins | JC3019543  |
| Kauê M. de Araújo     | JC3019497  |

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

Incluir o arquivo **`.env`** em um repositório público é considerado uma falha de segurança. Contudo, para efeitos de demonstração, o repositório atual o contém. Embora não seja necessário alterar as variáveis de ambiente presentes no arquivo, é possível fazê-lo.

```
# Porta da aplicação
PORT=3000

# Definição do banco de dados SQLite
DB_DIALECT=sqlite
DB_STORAGE=database/database.sqlite

# Definição da sessão
SESSION_SECRET=estoque
```

### 4. Iniciar a Aplicação

Inicie o servidor Node.js:

```bash
npm start
```

A aplicação estará acessível em `http://localhost:3000` (ou na porta configurada no seu `.env`).

---

## Estrutura do Projeto

A estrutura do projeto segue o padrão MVC (Model-View-Controller):

```
estoque/
├── config/             # Configurações do banco de dados
├── controllers/        # Lógica de manipulação de requisições
├── middleware/         # Funções de middleware
├── models/             # Definições de modelos
├── public/             # Arquivos estáticos
├── routes/             # Definição das rotas da aplicação
├── views/              # Templates EJS
├── .env                # Variáveis de ambiente
├── app.js              # Configuração da aplicação Express
├── server.js           # Ponto de entrada do servidor
├── package.json        # Dependências e scripts do projeto
└── README.md           # Documentação do projeto
```