import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'

function App() {
  return (
    <>
      <Header />


      <main
        id="inicio"
        className="min-h-screen bg-amber-50"
      >
      <Hero />
      <Products />
      </main>
    </>
  )
}

export default App