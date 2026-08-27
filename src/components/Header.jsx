import { ShoppingCart, Sparkles } from 'lucide-react'

function Header({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 bg-amber-950/95 backdrop-blur border-b border-amber-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">

        <a
          href="#inicio"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-sm">
            <Sparkles size={20} />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg sm:text-xl font-bold">
              Trufa Store
            </h1>

            <span className="hidden sm:block text-xs text-amber-200">
              Trufas artesanais
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-2 bg-amber-900/50 p-1.5 rounded-2xl border border-amber-800">
          <a
            href="#inicio"
            className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-800 hover:text-amber-200 transition"
          >
            Início
          </a>

          <a
            href="#trufas"
            className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-800 hover:text-amber-200 transition"
          >
            Trufas
          </a>

          <a
            href="#assistente"
            className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-800 hover:text-amber-200 transition"
          >
            Assistente IA
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative flex shrink-0 items-center gap-2 bg-amber-400 text-amber-950 px-3 sm:px-5 py-2.5 rounded-xl font-bold hover:bg-amber-300 hover:-translate-y-0.5 transition shadow-sm"
        >
          <ShoppingCart size={20} />

          <span className="hidden sm:inline">
            Carrinho
          </span>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold min-w-6 h-6 px-1 rounded-full flex items-center justify-center border-2 border-amber-950">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  )
}

export default Header