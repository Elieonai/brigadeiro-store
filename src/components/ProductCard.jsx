import { ShoppingCart } from 'lucide-react'

function ProductCard({ product, onAddToCart }) {
  const badges = {
    1: '🔥 Mais pedido',
    2: '🥛 Cremosa',
    3: '🍓 Frutado',
    4: '✨ Especial',
  }

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-amber-900/30
        bg-amber-950
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
        flex
        flex-col
        h-full
      "
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-64
            object-cover
            group-hover:scale-105
            transition-transform
            duration-500
          "
        />

        <span
          className="
            absolute
            top-4
            left-4
            bg-amber-50/95
            backdrop-blur-sm
            text-amber-950
            text-xs
            font-bold
            px-3
            py-2
            rounded-full
            shadow-sm
          "
        >
          {badges[product.id] || '🍫 Artesanal'}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-5">
          <h3
            className="
              text-xl
              font-bold
              text-amber-50
              mb-2
              group-hover:text-amber-300
              transition
            "
          >
            {product.name}
          </h3>

          <p className="text-amber-100/75 leading-relaxed text-sm">
            {product.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="border-t border-amber-700/50 pt-4 flex items-end justify-between gap-3">

            <div>
              <span className="block text-xs text-amber-200/60 mb-1">
                A partir de
              </span>

              <span className="text-xl font-bold text-amber-400">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="
                flex
                items-center
                justify-center
                gap-2
                bg-amber-500
                text-amber-950
                font-bold
                px-4
                py-3
                rounded-xl
                hover:bg-amber-400
                active:scale-95
                transition-all
                shadow-sm
              "
            >
              <ShoppingCart size={18} />
              <span>Adicionar</span>
            </button>

          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard