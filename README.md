# 🍫 Trufa Store

Loja virtual de trufas artesanais desenvolvida com React, Vite e Tailwind CSS.

O projeto permite visualizar os sabores disponíveis, adicionar produtos ao carrinho, alterar quantidades, informar os dados do cliente, consultar o endereço através do CEP, receber recomendações personalizadas utilizando Inteligência Artificial e finalizar o pedido pelo WhatsApp.

---

## 🚀 Funcionalidades

- Visualização do catálogo de trufas
- Adição de produtos ao carrinho
- Contador de produtos no carrinho
- Aumento e diminuição da quantidade
- Remoção de produtos
- Cálculo automático do subtotal
- Cálculo automático do valor total do pedido
- Formulário com dados do cliente
- Validação dos campos obrigatórios
- Consulta automática de endereço através do CEP
- Validação de CEP inválido
- Escolha da forma de pagamento
- Geração automática da mensagem do pedido
- Finalização do pedido pelo WhatsApp
- Assistente de recomendação utilizando Inteligência Artificial
- Recomendações personalizadas de trufas
- Layout responsivo para celular, tablet e computador

---

## 🍬 Sabores disponíveis

Atualmente a loja possui os seguintes sabores:

- Trufa de Chocolate
- Trufa de Ninho
- Trufa de Morango
- Trufa de Maracujá

---

## 🤖 Assistente com Inteligência Artificial

A Trufa Store possui um assistente que utiliza Inteligência Artificial para ajudar o cliente a escolher os sabores mais adequados.

O cliente pode informar suas preferências, por exemplo:

> Quero trufas para uma festa. Gosto de chocolate e não quero morango.

A aplicação envia a preferência para o servidor, que utiliza a API do Google Gemini para gerar uma recomendação personalizada utilizando apenas os sabores disponíveis na loja.

### Fluxo da integração

1. O cliente informa suas preferências.
2. O React envia uma requisição para o backend.
3. O servidor processa a solicitação.
4. A API do Gemini gera uma recomendação.
5. A recomendação é exibida para o cliente.

---

## 📍 Integração com CEP

Durante o preenchimento dos dados do cliente, a aplicação permite consultar um CEP e preencher automaticamente informações do endereço.

Caso o CEP informado seja inválido, a aplicação exibe uma mensagem de erro para o usuário.

---

## 🛒 Fluxo do pedido

1. O cliente escolhe as trufas desejadas.
2. Adiciona os produtos ao carrinho.
3. Ajusta as quantidades.
4. Informa seus dados.
5. Informa o CEP para buscar o endereço.
6. Escolhe a forma de pagamento.
7. Confere o pedido.
8. Finaliza o pedido pelo WhatsApp.

---

## 🛠️ Tecnologias utilizadas

### Front-end

- React
- JavaScript
- Vite
- Tailwind CSS
- Lucide React

### Back-end

- Node.js
- Express
- CORS
- dotenv

### APIs e serviços

- Google Gemini API
- API de consulta de CEP
- WhatsApp

### Desenvolvimento

- Git
- GitHub
- ESLint

---

## 📁 Estrutura do projeto

```text
trufa-store/
│
├── public/
│   ├── trufa-chocolate.png
│   ├── trufa-ninho.png
│   ├── trufa-morango.png
│   └── trufa-maracuja.png
│
├── server/
│   └── server.js
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AIRecommendation.jsx
│   │   ├── Cart.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   └── Products.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entre na pasta

```bash
cd trufa-store
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

> ⚠️ Nunca envie sua chave da API para o GitHub. O arquivo `.env` deve permanecer no `.gitignore`.

### 5. Inicie o backend

```bash
npm run server
```

O servidor será iniciado em:

```text
http://localhost:3001
```

### 6. Inicie o front-end

Abra outro terminal e execute:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço local da aplicação.

---

## 🔐 Segurança

As chaves de API são armazenadas através de variáveis de ambiente.

O arquivo `.env` não deve ser enviado ao repositório.

Exemplo:

```env
GEMINI_API_KEY=sua_chave_aqui
```

No `.gitignore`:

```gitignore
.env
```

---

## 💡 Exemplo do assistente

O usuário pode escrever:

```text
Quero trufas para uma festa. Gosto de chocolate e não quero morango.
```

O assistente analisa a preferência e recomenda apenas sabores disponíveis na Trufa Store.

---

## 📱 Responsividade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela:

- 📱 Celulares
- 📱 Tablets
- 💻 Notebooks
- 🖥️ Desktops

---

## 🔮 Melhorias futuras

Algumas funcionalidades que podem ser adicionadas futuramente:

- Persistência do carrinho
- Sistema de pedidos
- Banco de dados
- Painel administrativo
- Cadastro e gerenciamento de produtos
- Controle de estoque
- Histórico de pedidos
- Autenticação de usuários
- Pagamento online
- Deploy do front-end e backend

---

## 👨‍💻 Autor

Desenvolvido por **Elioenai Junior**.

Projeto desenvolvido para prática e evolução em desenvolvimento Full Stack, integração com APIs e Inteligência Artificial.