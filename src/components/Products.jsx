import products from '../data/products'
import ProductCard from './ProductCard'

function Products() {
  return (
    <section
      id="brigadeiros"
      className="bg-amber-100 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-amber-700 font-semibold mb-2">
            Nossos sabores
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-amber-950">
            Escolha seu brigadeiro favorito
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products