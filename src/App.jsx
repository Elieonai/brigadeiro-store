import { useState } from 'react'
import './index.css'

import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import Cart from './components/Cart'
import CustomerForm from './components/CustomerForm'
import AIRecommendation from './components/AIRecommendation'
import Footer from './components/Footer'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // ADICIONAR PRODUTO
  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  // AUMENTAR QUANTIDADE
  function handleIncrease(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  // DIMINUIR QUANTIDADE
  function handleDecrease(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // REMOVER PRODUTO
  function handleRemove(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    )
  }

  // FINALIZAR PEDIDO
  // customer agora vem diretamente do CustomerForm
  function handleFinishOrder(customer) {
    if (cart.length === 0) {
      alert('Adicione pelo menos uma trufa ao carrinho.')
      return
    }

    // QUANTIDADE TOTAL
    const totalQuantity = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    )

    // PREÇO NORMAL
    const originalTotal = cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    )

    // PROMOÇÃO 4 POR R$ 10
    const combos = Math.floor(totalQuantity / 4)
    const remainingTruffles = totalQuantity % 4

    const total =
      combos * 10 + remainingTruffles * 3

    const discount = originalTotal - total

    // PRODUTOS
    const productsMessage = cart
      .map((item) => {
        const subtotal =
          item.price * item.quantity

        return `${item.name}
Quantidade: ${item.quantity}
Valor unitário: ${item.price.toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          }
        )}
Subtotal: ${subtotal.toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          }
        )}`
      })
      .join('\n\n')

    // PROMOÇÃO
    const promotionMessage =
      discount > 0
        ? `
🔥 *Promoção aplicada*

${combos} ${
            combos === 1
              ? 'combo'
              : 'combos'
          } de 4 trufas por R$ 10,00

Valor sem promoção: ${originalTotal.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            }
          )}

Desconto: -${discount.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL',
            }
          )}
`
        : ''

    // MENSAGEM WHATSAPP
    const message = `🍫 *NOVO PEDIDO - TRUFA STORE*

Olá! Gostaria de fazer um pedido:

----------------------------

${productsMessage}

----------------------------
${promotionMessage}

Quantidade total: ${totalQuantity} ${
      totalQuantity === 1
        ? 'trufa'
        : 'trufas'
    }

💰 *Total do pedido: ${total.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )}*

----------------------------

👤 *Dados do cliente*

Nome: ${customer.name}
Telefone: ${customer.phone}

📍 *Entrega / Retirada*

CEP: ${customer.cep}
Endereço: ${customer.address}, ${customer.number}
Bairro: ${customer.neighborhood}
Cidade: ${customer.city} - ${customer.state}
Complemento: ${
      customer.complement || 'Não informado'
    }

💳 Forma de pagamento: ${customer.payment}

----------------------------

Pedido realizado pelo site Trufa Store 🍫`

    const encodedMessage =
      encodeURIComponent(message)

    const phoneNumber = '5581988501888'

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  // QUANTIDADE NO CARRINHO
  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  return (
    <>
      {/* HEADER */}
      <Header
        cartCount={cartCount}
        onOpenCart={() =>
          setIsCartOpen(true)
        }
      />

      {/* CARRINHO */}
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
      />

      {/* CONTEÚDO */}
      <main className="min-h-screen bg-amber-50">

        <Hero />

        <Products
          onAddToCart={handleAddToCart}
        />

        <AIRecommendation />

        {/* CHECKOUT */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">

          <CustomerForm
            onSubmit={handleFinishOrder}
          />

        </div>

      </main>

      <Footer />
    </>
  )
}

export default App