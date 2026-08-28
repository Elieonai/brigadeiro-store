import { useState } from 'react'
import './index.css'

import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import Cart from './components/Cart'
import CustomerForm from './components/CustomerForm'
import AIRecommendation from './components/AIRecommendation'
import Footer from './components/Footer'
import PixModal from './components/PixModal'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] =
    useState(false)

  const [isPixModalOpen, setIsPixModalOpen] =
    useState(false)

  const [pixData, setPixData] =
    useState(null)

  const [
    pendingWhatsAppUrl,
    setPendingWhatsAppUrl,
  ] = useState('')

  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existingProduct =
        currentCart.find(
          (item) =>
            item.id === product.id
        )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
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

  function handleIncrease(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    )
  }

  function handleDecrease(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    )
  }

  function handleRemove(id) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    )
  }

  async function handleFinishOrder(
    customer
  ) {
    if (cart.length === 0) {
      alert(
        'Adicione pelo menos uma trufa ao carrinho.'
      )

      return
    }

    // QUANTIDADE
    const totalQuantity =
      cart.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      )

    // VALOR NORMAL
    const originalTotal =
      cart.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0
      )

    // PROMOÇÃO
    const combos =
      Math.floor(
        totalQuantity / 4
      )

    const remainingTruffles =
      totalQuantity % 4

    const total =
      combos * 10 +
      remainingTruffles * 3

    const discount =
      originalTotal - total

    // PRODUTOS
    const productsMessage =
      cart
        .map((item) => {
          const subtotal =
            item.price *
            item.quantity

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

    const cepMessage =
      customer.cep ||
      'Não informado'

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

CEP: ${cepMessage}
Endereço: ${customer.address}, ${customer.number}
Bairro: ${customer.neighborhood}
Cidade: ${customer.city} - ${customer.state}
Complemento: ${
      customer.complement ||
      'Não informado'
    }

💳 Forma de pagamento: ${customer.payment}

----------------------------

Pedido realizado pelo site Trufa Store 🍫`

    const encodedMessage =
      encodeURIComponent(message)

    const phoneNumber =
      '5581988501888'

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    // =====================
    // PAGAMENTO PIX
    // =====================

    if (
      customer.payment === 'Pix'
    ) {
      try {
        const response =
          await fetch('/api/pix', {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              totalQuantity,
            }),
          })

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              'Erro ao gerar Pix.'
          )
        }

        setPixData(data)

        setPendingWhatsAppUrl(
          whatsappUrl
        )

        setIsPixModalOpen(true)

        return
      } catch (error) {
        console.error(
          'Erro ao gerar pagamento Pix:',
          error
        )

        alert(
          'Não foi possível gerar o Pix. Tente novamente.'
        )

        return
      }
    }

    // DINHEIRO OU CARTÃO
    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function handleContinueWhatsApp() {
    if (!pendingWhatsAppUrl) {
      return
    }

    window.open(
      pendingWhatsAppUrl,
      '_blank',
      'noopener,noreferrer'
    )

    setIsPixModalOpen(false)
  }

  function handleClosePixModal() {
    setIsPixModalOpen(false)
  }

  const cartCount =
    cart.reduce(
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
        onIncrease={
          handleIncrease
        }
        onDecrease={
          handleDecrease
        }
        onRemove={
          handleRemove
        }
      />

      {/* PIX */}
      {pixData && (
        <PixModal
          isOpen={
            isPixModalOpen
          }
          onClose={
            handleClosePixModal
          }
          qrCode={
            pixData.qrCode
          }
          pixPayload={
            pixData.pixPayload
          }
          amount={
            pixData.amount
          }
          onContinue={
            handleContinueWhatsApp
          }
        />
      )}

      {/* CONTEÚDO */}
      <main className="min-h-screen bg-amber-50">

        <Hero />

        <Products
          onAddToCart={
            handleAddToCart
          }
        />

        <AIRecommendation />

        {/* CHECKOUT */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">

          <CustomerForm
            onSubmit={
              handleFinishOrder
            }
          />

        </div>

      </main>

      <Footer />
    </>
  )
}

export default App