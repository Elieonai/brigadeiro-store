function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-[600px] flex items-center bg-amber-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">

        <div>
          <p className="text-amber-700 font-semibold mb-3">
            Feitos com carinho 🍫
          </p>

         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-950 leading-tight mb-6">
            Brigadeiros que deixam seu dia mais doce
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-8">
            Brigadeiros artesanais preparados com ingredientes
            selecionados e muito sabor.
          </p>

          <a
            href="#brigadeiros"
            className="inline-block bg-amber-500 text-amber-950 font-semibold px-6 py-3 rounded-xl hover:bg-amber-400 transition"
          >
            Ver brigadeiros
          </a>
        </div>

        <div className="flex justify-center">
          <img
            src="/Brigadeiro.png"
            alt="Brigadeiros artesanais"
            className="w-full max-w-md rounded-3xl"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero