# Estoque

Este repositório hospeda o código-fonte da aplicação desenvolvida para o projeto final da disciplina de **Desenvolvimento de Aplicações Web**.

### Integrantes do Grupo

| Nome Completo         | Prontuário |
| :---                  | :---       |
| Mateus G. P. Campos   | JC3019705  |
| Ray G. dos S. Martins | JC3019543  |
| Kevin L. R. de Candia | JC3018784  |
| Kauê M. de Araújo     | JC3019497  |

---

## Descrição do Projeto

**Estoque** é uma aplicação web completa, desenvolvida para demonstrar o emprego de conceitos apurados ao decorrer do ano na disciplina de Desenvolvimento de Aplicações Web.

---

## Funcionalidades Principais

*   **Autenticação de Usuários**: Registro e login com senhas criptografadas
*   **Gerenciamento de Categorias**: CRUD completo de categorias de produtos
*   **Gerenciamento de Produtos**: CRUD completo com associação a categorias
*   **Gerenciamento de Usuários**: Visualização, edição e exclusão de usuários
*   **Controle de Acesso**: Todas as funcionalidades protegidas por autenticação

---

## Conjunto de tecnologias, ferramentas e frameworks

A aplicação foi construída utilizando a seguinte pilha de tecnologias, conforme os requisitos do projeto:

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

# Definição do banco de dados
DB_DIALECT=sqlite
DB_STORAGE=database/database.sqlite

# Definição da chave secreta de sessão. Use uma string longa, aleatória e segura em produção.
SESSION_SECRET=estoque
```

### 4. Iniciar a Aplicação

Inicie o servidor Node.js:

```bash
npm start
```

Para desenvolvimento com reinicialização automática, utilize:

```bash
npm run dev
```

A aplicação estará acessível em `http://localhost:3000` (ou na porta configurada no seu `.env`).

---

## Rotas Disponíveis

### Autenticação (Públicas)
| Método | Rota         | Descrição                    |
| :---   | :---         | :---                         |
| GET    | `/entrar`    | Página de login              |
| POST   | `/entrar`    | Realizar login               |
| GET    | `/registrar` | Página de registro           |
| POST   | `/registrar` | Criar nova conta             |
| POST   | `/sair`      | Logout (requer autenticação) |

### Página inicial (Protegido)
| Método | Rota | Descrição      |
| :---   | :--- | :---           |
| GET    | `/`  | Página inicial |

### Produtos (Protegido)
| Método | Rota                   | Descrição                      |
| :---   | :---                   | :---                           |
| GET    | `/produtos`            | Listar todos os produtos       |
| GET    | `/produtos/novo`       | Formulário para novo produto   |
| POST   | `/produtos`            | Criar novo produto             |
| GET    | `/produtos/:id`        | Visualizar detalhes do produto |
| GET    | `/produtos/:id/editar` | Formulário de edição           |
| PUT    | `/produtos/:id`        | Atualizar produto              |
| DELETE | `/produtos/:id`        | Excluir produto                |

### Categorias (Protegido)
| Método | Rota                  | Descrição                      |
| :---   | :---                  | :---                           |
| GET    | `/categorias`         | Listar todas as categorias     |
| GET    | `/categorias/nova`    | Formulário para nova categoria |
| POST   | `/categorias`         | Criar nova categoria           |
| GET    | `/categorias/:id`     | Formulário de edição           |
| PUT    | `/categorias/:id`     | Atualizar categoria            |
| DELETE | `/categorias/:id`     | Excluir categoria              |

### Usuários (Protegido)
| Método | Rota            | Descrição                |
| :---   | :---            | :---                     |
| GET    | `/usuarios`     | Listar todos os usuários |
| GET    | `/usuarios/:id` | Formulário de edição     |
| PUT    | `/usuarios/:id` | Atualizar usuário        |
| DELETE | `/usuarios/:id` | Excluir usuário          |

---

## Estrutura do Projeto

A estrutura do projeto segue o padrão MVC (Model-View-Controller):

```
estoque/
├── config/             # Configurações do banco de dados
├── controllers/        # Lógica de manipulação de requisições
├── middleware/         # Funções de middleware
├── models/             # Definições de modelos
├── routes/             # Definição das rotas da aplicação
├── views/              # Templates
├── .env                # Variáveis de ambiente
├── app.js              # Configuração da aplicação Express
├── server.js           # Ponto de entrada do servidor
├── package.json        # Dependências e scripts do projeto
└── README.md           # Documentação do projeto
```
