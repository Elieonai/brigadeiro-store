import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import Cart from './components/Cart'
import CustomerForm from './components/CustomerForm'
import AIRecommendation from './components/AIRecommendation'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
    payment: '',
  })

  function handleAddToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
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
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  function handleDecrease(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function handleRemove(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    )
  }

  function handleFinishOrder() {
    if (cart.length === 0) {
      alert('Adicione pelo menos um brigadeiro ao carrinho.')
      return
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const productsMessage = cart
      .map((item) => {
        const subtotal = item.price * item.quantity

        return `${item.name}
Quantidade: ${item.quantity}
Subtotal: ${subtotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`
      })
      .join('\n\n')

    const message = `Olá! Gostaria de fazer um pedido:

${productsMessage}

Total: ${total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}

Dados do cliente:
Nome: ${customer.name}
Telefone: ${customer.phone}
CEP: ${customer.cep}
Endereço: ${customer.address}, ${customer.number}
Bairro: ${customer.neighborhood}
Cidade: ${customer.city} - ${customer.state}
Complemento: ${customer.complement || 'Não informado'}
Forma de pagamento: ${customer.payment}`

    const encodedMessage = encodeURIComponent(message)

    const phoneNumber = '5581988501888'

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <>
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
      />

      <main
        id="inicio"
        className="min-h-screen bg-amber-50"
      >
        <Hero />
        <Products onAddToCart={handleAddToCart} />
        
        <AIRecommendation />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <CustomerForm
            customer={customer}
            setCustomer={setCustomer}
            onSubmit={handleFinishOrder}
          />
        </div>
      </main>
    </>
  )
}

export default App