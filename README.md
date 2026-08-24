# 🍫 Brigadeiro Store

Loja virtual de brigadeiros desenvolvida com React, Vite e Tailwind CSS.

O projeto permite visualizar os sabores disponíveis, adicionar produtos ao carrinho, alterar quantidades, informar os dados do cliente e finalizar o pedido através do WhatsApp.

## 🚀 Funcionalidades

- Visualização do catálogo de brigadeiros
- Adição de produtos ao carrinho
- Contador de produtos no carrinho
- Aumento e diminuição da quantidade
- Remoção de produtos
- Cálculo automático do subtotal de cada produto
- Cálculo automático do valor total do pedido
- Formulário com dados do cliente
- Validação dos campos obrigatórios
- Escolha da forma de pagamento
- Geração automática da mensagem do pedido
- Finalização do pedido pelo WhatsApp
- Layout responsivo para celular, tablet e computador

## 🍬 Sabores disponíveis

Atualmente a loja possui os seguintes brigadeiros:

- Brigadeiro Tradicional
- Brigadeiro de Ninho
- Brigadeiro de Morango
- Brigadeiro de Pistache

## 🛠️ Tecnologias utilizadas

- React
- JavaScript
- Vite
- Tailwind CSS
- Lucide React
- HTML5
- Git e GitHub

## 📁 Estrutura do projeto

```text
brigadeiro-store/
├── public/
│   ├── tradicional.png
│   ├── ninho.png
│   ├── morango.png
│   └── pistache.png
│
├── src/
│   ├── components/
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
├── package.json
└── README.md
```

## 💻 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Elioenai/brigadeiro-store.git
```

### 2. Entre na pasta do projeto

```bash
cd brigadeiro-store
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

### 5. Abra no navegador

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

## 🛒 Como funciona o pedido

1. O cliente escolhe os brigadeiros desejados.
2. Os produtos são adicionados ao carrinho.
3. O cliente pode alterar as quantidades ou remover produtos.
4. O sistema calcula automaticamente o valor total.
5. O cliente informa nome, telefone, endereço e forma de pagamento.
6. Ao continuar, o sistema monta a mensagem com os dados do pedido.
7. O WhatsApp é aberto com a mensagem do pedido pronta para envio.

## 📱 Responsividade

A aplicação foi desenvolvida utilizando os breakpoints do Tailwind CSS e se adapta a diferentes tamanhos de tela, incluindo celulares, tablets e computadores.

## 📌 Status do projeto

🚧 Versão 1.0 em desenvolvimento.

## 👨‍💻 Autor

Desenvolvido por Elioenai Junior.