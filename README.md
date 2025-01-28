# RotaLocadora - Sistema de Gerenciamento de Veículos

## ✨ Visão Geral do Projeto

O **RotaLocadora** é um sistema completo para gerenciar o cadastro, consulta e manipulação de dados de veículos de uma locadora. O projeto foi desenvolvido para proporcionar uma interface intuitiva no front-end com funcionalidades robustas no back-end, utilizando tecnologias modernas e eficientes.

### 🚜 Principais Funcionalidades

- **Cadastro de Veículos:** Interface para adicionar novos veículos no sistema.
- **Consulta Dinâmica:** Filtros por marca, placa e uso do veículo.
- **Histórico de Atividades:** Visualização de alterações e transações realizadas.
- **Sistema de Paginação:** Visualização otimizada de registros em listas.
- **Autenticação Segura:** Utilização de tokens JWT para validação e segurança.

---

## ⚙️ Tecnologias Utilizadas

- **Front-End:**
  - Vue.js (Framework progressivo para construção de interfaces de usuário).
  - JavaScript.
  - CSS.
- **Back-End:**
  - Node.js e Express.js.
  - Prisma ORM.
  - MySQL (banco de dados relacional).
  - JWT (Json Web Tokens) para autenticação.
- **Containerização:**
  - Docker e Docker Compose para criação e gerenciamento dos contêineres.
- **Outros:**
  - Axios para requisições HTTP.
  - ESLint para padronização de código.

---

## 📈 Estrutura do Projeto

### Diretório Back-End (`/Backend`)

- **server.js:** Arquivo principal para inicialização do servidor.
- **services/api.js:** Conexão e comunicação com o banco de dados.
- **Prisma Schema:** Configuração e modelo dos dados utilizados no banco MySQL.
- **Dockerfile:** Configuração para containerização do back-end.

### Diretório Front-End (`/Frontend`)

- **Componentes Vue:** Estruturados para reutilização e organização de código.
- **Arquivos de Estilo:** Personalização utilizando CSS para uma interface responsiva.
- **Axios Config:** Configuração de requisições ao back-end.

### Docker Compose (`docker-compose.yml`)

- Configurações para inicializar o MySQL e o backend simultaneamente em contêineres.

---

## 🔧 Como Executar o Projeto

### 🚀 Executando com Docker

#### 1. Certifique-se de que o Docker e o Docker Compose estão instalados.
#### 2. Comandos para Inicialização:

```bash
# Na raiz do diretório onde está o arquivo docker-compose.yml
docker-compose up --build
```

- O backend estará disponível em: `http://localhost:3000`
- O MySQL estará configurado no contêiner `mysql-container`.

#### 3. Gerenciar os Contêineres:

```bash
# Parar os contêineres
docker-compose down

# Verificar logs
docker logs [container_name]
```

### ⚖️ Executando sem Docker

#### Back-End

1. Instale as dependências:

```bash
cd Backend
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL=mysql://[usuario]:[senha]@[host]:3306/rotalocadora
JWT_SECRET=seu-segredo-jwt
```

3. Inicie o servidor:

```bash
npm start
```

#### Front-End

1. Instale as dependências:

```bash
cd Frontend
npm install
```

2. Inicie o servidor:

```bash
npm run serve
```

- O front-end estará disponível em: `http://localhost:8080`

---

## 🎮 Melhorias Futuras

- Implementação de testes unitários.
- Melhorias na interface utilizando frameworks CSS modernos.
- Suporte para outros bancos de dados não relacionais (como MongoDB).

---

## 🔗 Links Relevantes

- **Documentação do Prisma:** [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Docker Compose:** [https://docs.docker.com/compose](https://docs.docker.com/compose)

Sinta-se à vontade para explorar o código, contribuir e enviar sugestões!

