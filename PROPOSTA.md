# Proposta do Projeto - Estoque

## 1. Escopo e MVP

Sistema web de gerenciamento de estoque simplificado, focado em qualidade de execução e cumprimento rigoroso dos requisitos acadêmicos.

### Entidades Centrais
- **Usuários (users)**: Controle de acesso e autenticação
- **Categorias (categories)**: Classificação de produtos
- **Produtos (products)**: Itens do estoque com relacionamento para categorias

### Fluxos MVP
- Autenticação segura com sessões e senhas criptografadas
- CRUD completo para usuários, categorias e produtos
- Consultas com JOIN para exibir produtos com suas categorias
- Validações de integridade referencial ao excluir categorias
- Dashboard com estatísticas básicas e alertas de estoque baixo
- Sistema de busca e filtros por categoria

---

## 2. Modelo de Banco de Dados (SQLite)

### Estrutura das Tabelas

**users**
- `id`: INTEGER PRIMARY KEY AUTOINCREMENT
- `name`: VARCHAR(100) NOT NULL
- `password_hash`: VARCHAR(255) NOT NULL

**categories**
- `id`: INTEGER PRIMARY KEY AUTOINCREMENT
- `name`: VARCHAR(100) UNIQUE NOT NULL
- `description`: TEXT

**products**
- `id`: INTEGER PRIMARY KEY AUTOINCREMENT
- `name`: VARCHAR(200) NOT NULL
- `description`: TEXT
- `category_id`: INTEGER NOT NULL (FK → categories.id)
- `quantity`: INTEGER DEFAULT 0
- `price`: DECIMAL(10,2) NOT NULL
- `reorder_level`: INTEGER DEFAULT 10
- `active`: BOOLEAN DEFAULT true

### Políticas de Chave Estrangeira
- **products.category_id**: `ON DELETE RESTRICT` → Impede exclusão de categorias com produtos associados
- Validação em nível de aplicação antes de permitir exclusões

---

## 3. Mapeamento Completo dos Requisitos CRUD

### **CREATE (mínimo 3)**
1. ✅ Criar usuário (com senha criptografada via bcrypt)
2. ✅ Criar categoria
3. ✅ Criar produto (associado a uma categoria)

### **UPDATE (mínimo 3, sendo 1 envolvendo relacionamentos)**
1. ✅ Atualizar dados do usuário (nome, email, senha)
2. ✅ Atualizar informações da categoria
3. ✅ **Atualizar produto e alterar sua categoria** → Atualiza chave estrangeira `category_id`

### **READ (mínimo 3, sendo 2 com JOIN)**
1. ✅ **Listar todos os produtos com nome da categoria** → JOIN entre products e categories
2. ✅ **Filtrar produtos por categoria específica** → JOIN com filtro WHERE
3. ✅ Visualizar perfil do usuário logado

**Consultas Adicionais (opcionais mas recomendadas):**
- Listar produtos com estoque baixo (quantity < reorder_level)
- Buscar produtos por nome
- Exibir estatísticas gerais (total de produtos, categorias, etc.)

### **DELETE (mínimo 3, sendo 1 afetando dados relacionados)**
1. ✅ Excluir usuário
2. ✅ **Excluir categoria (com validação)** → Verifica se existem produtos associados; se sim, bloqueia a exclusão e exige reatribuição
3. ✅ Excluir produto

---

## 4. Regras de Negócio

### Validações de Integridade
- Ao excluir uma categoria, verificar se existem produtos com `category_id` referenciando-a
- Se produtos associados existirem, retornar erro e listar os produtos afetados
- Exigir reatribuição de categoria antes de permitir exclusão

### Controle de Estoque
- Campo `quantity` nunca pode ser negativo
- Alertas visuais quando `quantity < reorder_level`
- Campo `active` permite desativar produtos sem excluí-los

### Autenticação
- Senhas devem ter no mínimo 6 caracteres
- Email deve ser único no sistema
- Hash de senhas com **bcrypt** antes de armazenar
- Sessões gerenciadas com **express-session**

---

## 5. Autenticação e Segurança

### Sistema de Autenticação
- **Registro**: Hash de senhas com bcrypt (custo: 10)
- **Login**: express-session com armazenamento em memória
- **Sessão**: Armazena apenas user_id e role
- **Logout**: Destruição completa da sessão

### Middlewares de Proteção
- `isAuthenticated`: Protege todas as rotas de gerenciamento
- `isAdmin`: Restringe ações sensíveis (ex: excluir categorias, gerenciar usuários)
- Validação de entrada com sanitização de strings
- Proteção contra SQL injection via Sequelize ORM

### Políticas de Segurança
- Senhas nunca retornadas em consultas (excluir do SELECT)
- Mensagens de erro genéricas em autenticação (evitar enumeração de usuários)
- Timeout de sessão após inatividade

---

## 6. Estrutura MVC e Roteamento RESTful

### Organização de Pastas
```
src/
├── config/          # Configurações (DB, ambiente)
├── models/          # Models Sequelize
├── controllers/     # Lógica de controle
├── routes/          # Definição de rotas
├── middlewares/     # Autenticação, validação
├── views/           # Templates EJS
│   ├── partials/    # Componentes reutilizáveis
│   ├── auth/        # Login, registro
│   ├── products/    # CRUD de produtos
│   ├── categories/  # CRUD de categorias
│   └── dashboard/   # Página inicial
└── public/          # Assets estáticos (CSS, JS, imagens)
```

### Rotas RESTful Principais

**Autenticação:**
- `GET /login` - Exibir formulário de login
- `POST /login` - Processar login
- `GET /register` - Exibir formulário de registro
- `POST /register` - Criar novo usuário
- `POST /logout` - Encerrar sessão

**Produtos:**
- `GET /products` - Listar todos os produtos (com categoria)
- `GET /products/new` - Formulário de criação
- `POST /products` - Criar produto
- `GET /products/:id` - Visualizar detalhes
- `GET /products/:id/edit` - Formulário de edição
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Excluir produto

**Categorias:**
- `GET /categories` - Listar categorias
- `GET /categories/new` - Formulário de criação
- `POST /categories` - Criar categoria
- `GET /categories/:id/edit` - Formulário de edição
- `PUT /categories/:id` - Atualizar categoria
- `DELETE /categories/:id` - Excluir categoria (com validação)

**Dashboard:**
- `GET /` ou `GET /dashboard` - Página inicial com estatísticas

### Uso de method-override
Suporte para PUT/DELETE em formulários HTML via `_method` query parameter.

---

## 7. Frontend EJS e UX

### Sistema de Parciais (Partials)
- `header.ejs` - Cabeçalho com logo e título
- `navbar.ejs` - Barra de navegação (links variam por papel do usuário)
- `footer.ejs` - Rodapé com informações do sistema
- `messages.ejs` - Exibição de mensagens flash (sucesso/erro)

### Layout Responsivo
- **Grid de 12 colunas** (Bootstrap ou CSS Grid)
- **Breakpoints:**
  - Desktop: ≥ 1024px
  - Tablet: 768px - 1023px
  - Mobile: < 768px
- Navegação adaptável (menu hambúrguer em mobile)

### Páginas Principais

**Dashboard:**
- Cards com estatísticas: total de produtos, valor total do estoque, produtos com estoque baixo
- Gráfico simples de produtos por categoria (opcional)
- Lista de alertas (produtos abaixo do reorder_level)

**Listagem de Produtos:**
- Tabela responsiva com: nome, categoria, quantidade, preço
- Filtros: por categoria, busca por nome, apenas ativos/inativos
- Ações: editar, excluir, ativar/desativar
- Paginação (se houver muitos produtos)

**Formulários:**
- Validação client-side (HTML5) e server-side
- Feedback visual de campos obrigatórios
- Mensagens de erro claras
- Botões de ação bem visíveis

### Design System
- **Paleta de cores:** 3-4 cores principais (primária, secundária, sucesso, erro)
- **Tipografia:** Fonte legível (ex: Inter, Roboto, ou system-ui)
- **Ícones:** Conjunto consistente (ex: Bootstrap Icons, Font Awesome)
- **Espaçamento:** Sistema de 4px ou 8px base
- **Componentes:** Botões, cards, tabelas, formulários com estilo unificado

---

## 8. Exemplos de Consultas SQL (Conceitual)

### Produtos com Categoria (JOIN)
```sql
SELECT 
  p.id, 
  p.name, 
  p.quantity, 
  p.price,
  c.name AS category_name
FROM products p
INNER JOIN categories c ON c.id = p.category_id
WHERE p.active = true
ORDER BY p.name;
```

### Produtos com Estoque Baixo
```sql
SELECT 
  p.id,
  p.name,
  p.quantity,
  p.reorder_level,
  c.name AS category_name
FROM products p
INNER JOIN categories c ON c.id = p.category_id
WHERE p.quantity < p.reorder_level
  AND p.active = true;
```

### Validação Antes de Excluir Categoria
```sql
SELECT COUNT(*) AS total_products
FROM products
WHERE category_id = ? AND active = true;
```

---

## 9. Demonstração de Integridade Referencial (FK)

### Cenário de Exclusão de Categoria

**Caso 1: Categoria SEM produtos associados**
- Sistema permite exclusão
- Registro removido do banco
- Mensagem de sucesso exibida

**Caso 2: Categoria COM produtos associados**
- Sistema bloqueia exclusão
- Retorna erro HTTP 400
- Mensagem: "Não é possível excluir esta categoria. Existem X produtos associados."
- Lista os produtos afetados
- Sugere reatribuir produtos para outra categoria antes de excluir

### Política de ON DELETE RESTRICT
Implementada através de:
1. Constraint do banco de dados (nível SQLite)
2. Validação adicional na camada de aplicação (controller)
3. Interface que impede ação antes de tentar exclusão

---

## 10. Tecnologias e Dependências

### Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Frontend** | HTML5 + CSS3 + JavaScript + EJS | Renderização server-side, SEO-friendly |
| **Framework CSS** | Bootstrap 5 | Grid responsivo, componentes prontos |
| **Backend** | Node.js + Express.js 5.x | Framework minimalista e flexível |
| **Banco de Dados** | SQLite 3 + Sequelize ORM | Simplicidade, portabilidade, sem servidor |
| **Autenticação** | express-session + bcrypt | Sessão server-side, hash seguro |
| **Template Engine** | EJS | Sintaxe simples, JavaScript nativo |

### Dependências Principais (package.json)
- `express`: Framework web
- `express-session`: Gerenciamento de sessões
- `bcrypt`: Hashing de senhas
- `sequelize`: ORM para banco de dados
- `sqlite3`: Driver SQLite
- `ejs`: Template engine
- `method-override`: Suporte PUT/DELETE em forms
- `dotenv`: Variáveis de ambiente (opcional)

### Dependências de Desenvolvimento
- `nodemon`: Auto-reload durante desenvolvimento
- Linter/Formatter (opcional): ESLint, Prettier, ou Biome

---

## 11. Estrutura do README.md

### Seções Obrigatórias

1. **Descrição do Projeto**
   - Objetivo do sistema
   - Contexto acadêmico (projeto final da disciplina)
   - Conceito de "estoque" simplificado

2. **Integrantes do Grupo**
   - Tabela com: Nome Completo | Prontuário
   - Informação sobre contribuições (opcional)

3. **Tecnologias Utilizadas**
   - Lista completa da stack
   - Justificativa de escolhas técnicas

4. **Diagrama do Banco de Dados**
   - Modelo ER ou diagrama de tabelas
   - Destacar relacionamento FK (products → categories)

5. **Instruções de Instalação**
   - Pré-requisitos (Node.js, Git)
   - Comandos de clone, instalação, configuração
   - Como executar migrations/seeders

6. **Instruções de Execução**
   - Comando para iniciar servidor
   - URL de acesso local
   - Credenciais de usuários de teste

7. **Funcionalidades Implementadas**
   - Mapeamento claro dos requisitos CRUD
   - Destaque para operações com FK
   - Exemplos de consultas JOIN

8. **Capturas de Tela** (opcional mas recomendado)
   - Dashboard
   - Lista de produtos
   - Formulários principais

---

## 12. Critérios de Qualidade e Entrega

### Checklist de Qualidade

**Funcional:**
- [ ] Todos os 12 requisitos CRUD implementados e testados
- [ ] Autenticação funcionando (login/logout/sessão)
- [ ] Relacionamento FK products→categories funcionando
- [ ] Validação ao excluir categoria com produtos

**Técnico:**
- [ ] Arquitetura MVC bem estruturada
- [ ] Rotas RESTful seguindo convenções
- [ ] Senhas criptografadas com bcrypt
- [ ] Consultas SQL otimizadas (uso correto de JOIN)
- [ ] Tratamento de erros adequado

**Interface:**
- [ ] Layout responsivo em 3 tamanhos de tela
- [ ] Partials EJS reutilizados (header, footer, navbar, messages)
- [ ] Design consistente e profissional
- [ ] Feedback visual para ações do usuário

**Documentação:**
- [ ] README.md completo e bem formatado
- [ ] Diagrama de banco de dados claro
- [ ] Instruções de instalação testadas
- [ ] Comentários em código onde necessário

**Versionamento:**
- [ ] Repositório no GitHub com commits de todos os membros
- [ ] Histórico de commits significativo
- [ ] .gitignore configurado corretamente
- [ ] README.md na raiz do repositório

### Entrega Final
- Repositório GitHub público
- Link para acesso (se hospedado)
- Apresentação (se requisitado)
- Arquivo ZIP com código fonte (backup)

---

## 13. Diferenciais para Maximizar Avaliação

Considerando o escopo mínimo, investir em:

### Qualidade de Código
- Nomenclatura consistente e descritiva
- Separação clara de responsabilidades
- Funções pequenas e focadas
- Tratamento de erros robusto

### Interface Profissional
- Animações sutis (transições CSS)
- Estados de loading
- Mensagens de confirmação antes de excluir
- Ícones contextuais

### Funcionalidades Extras Simples
- Busca em tempo real (JavaScript client-side)
- Ordenação de tabelas por coluna
- Exportação de lista de produtos (CSV/PDF)
- Dark mode toggle

### Documentação Superior
- Diagramas claros
- Screenshots bem escolhidos
- Seção de "Decisões Técnicas" explicando escolhas
- Vídeo demo de 2-3 minutos (opcional)

---

**Data de Criação:** Novembro 2024  
**Versão:** 2.0 - Modelo Simplificado