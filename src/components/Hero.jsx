function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-[620px] flex items-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16">

        <div>
          <span className="inline-flex items-center bg-amber-100 text-amber-800 font-semibold px-4 py-2 rounded-full mb-5">
            🍫 Trufas artesanais feitas com carinho
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-950 leading-tight mb-6">
            Trufas que transformam
            <span className="text-amber-600"> qualquer momento</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
            Sabores irresistíveis, recheios cremosos e muito carinho
            em cada trufa. Escolha sua favorita e faça seu pedido
            de forma rápida e fácil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#trufas"
              className="inline-flex items-center justify-center bg-amber-500 text-amber-950 font-semibold px-7 py-3 rounded-xl hover:bg-amber-400 transition shadow-sm"
            >
              Ver trufas
            </a>

            <a
              href="#assistente"
              className="inline-flex items-center justify-center border border-amber-300 text-amber-900 font-semibold px-7 py-3 rounded-xl hover:bg-amber-100 transition"
            >
              ✨ Pedir recomendação
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-5 bg-amber-200/40 rounded-[2rem] blur-2xl" />

            <img
              src="/trufa-chocolate.png"
              alt="Trufa artesanal de chocolate"
              className="relative w-full max-w-md rounded-3xl shadow-xl"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero