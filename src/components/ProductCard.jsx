function ProductCard({ product, onAddToCart }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-amber-100 hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-amber-950 mb-2">
          {product.name}
        </h3>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-bold text-amber-800">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="bg-amber-500 text-amber-950 font-semibold px-4 py-2 rounded-xl hover:bg-amber-400 transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard