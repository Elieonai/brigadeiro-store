import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import Cart from './components/Cart'
import CustomerForm from './components/CustomerForm'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customer, setCustomer] = useState({
  name: '',
  phone: '',
  address: '',
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <CustomerForm
            customer={customer}
            setCustomer={setCustomer}
          />
        </div>
      </main>
    </>
  )
}

export default App