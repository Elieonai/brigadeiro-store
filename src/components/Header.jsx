import { ShoppingCart } from 'lucide-react'

function Header({ cartCount, onOpenCart }) {
  return (
    <header className="bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

        <h1 className="text-lg sm:text-2xl font-bold leading-tight">
          Trufa Store
        </h1>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#inicio"
            className="hover:text-amber-300 transition"
          >
            Início
          </a>

          <a
            href="#trufas"
            className="hover:text-amber-300 transition"
          >
            Trufas
          </a>

          <a
            href="#assistente"
            className="hover:text-amber-300 transition"
          >
            Assistente IA
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative flex shrink-0 items-center gap-2 bg-amber-400 text-amber-950 px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold hover:bg-amber-300 transition"
        >
          <ShoppingCart size={20} />

          <span className="hidden sm:inline">
            Carrinho
          </span>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  )
}

export default Header