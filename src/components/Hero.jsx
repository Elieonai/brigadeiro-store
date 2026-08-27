import { Sparkles, ShoppingBag, Truck } from 'lucide-react'

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        <div>
          <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-amber-200 text-amber-800 font-semibold px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles size={17} />
            Trufas artesanais feitas com carinho
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-amber-950 leading-[1.05] mb-6">
            Um momento doce
            <span className="block text-amber-600">
              começa com uma trufa
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
            Trufas artesanais com recheios cremosos e sabores
            irresistíveis. Escolha suas favoritas e faça seu pedido
            de forma simples e rápida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="#trufas"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-amber-950 font-bold px-7 py-3.5 rounded-xl hover:bg-amber-400 hover:-translate-y-0.5 transition shadow-md"
            >
              <ShoppingBag size={19} />
              Ver trufas
            </a>

            <a
              href="#assistente"
              className="inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur border border-amber-300 text-amber-900 font-semibold px-7 py-3.5 rounded-xl hover:bg-white transition"
            >
              <Sparkles size={18} />
              Pedir recomendação
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              Produção artesanal
            </div>

            <div className="flex items-center gap-2">
              <Truck size={16} className="text-amber-700" />
              Pedido rápido pelo WhatsApp
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-lg">

            <div className="absolute inset-8 bg-amber-300/30 rounded-full blur-3xl" />

            <div className="relative bg-white/70 backdrop-blur border border-white rounded-[2rem] p-3 shadow-2xl">
              <img
                src="/trufa-chocolate.png"
                alt="Trufa artesanal de chocolate"
                className="w-full aspect-square object-cover rounded-[1.6rem]"
              />

              <div className="absolute left-0 sm:-left-6 bottom-6 bg-white rounded-2xl shadow-lg px-4 py-3 border border-amber-100">
                <p className="text-xs text-gray-500">
                  Feitas artesanalmente
                </p>

                <p className="font-bold text-amber-950">
                  🍫 Sabor irresistível
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero