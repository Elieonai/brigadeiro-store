import { ShoppingCart } from 'lucide-react'

function Header() {
  return (
    <header className="bg-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

        <h1 className="text-lg sm:text-2xl font-bold leading-tight">
          Brigadeiro Store
        </h1>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#inicio"
            className="hover:text-amber-300 transition"
          >
            Início
          </a>

          <a
            href="#brigadeiros"
            className="hover:text-amber-300 transition"
          >
            Brigadeiros
          </a>

          <a
            href="#contato"
            className="hover:text-amber-300 transition"
          >
            Contato
          </a>
        </nav>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 bg-amber-400 text-amber-950 px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold hover:bg-amber-300 transition"
        >
          <ShoppingCart size={20} />

          <span className="hidden sm:inline">
            Carrinho
          </span>
        </button>

      </div>
    </header>
  )
}

export default Header