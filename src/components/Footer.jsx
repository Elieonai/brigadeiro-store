import {
  MapPin,
  Sparkles,
} from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#2A1006] text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* MARCA */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Trufa Store
                </h2>

                <p className="text-xs text-amber-200">
                  Trufas artesanais
                </p>
              </div>
            </div>

            <p className="text-sm text-amber-100/70 max-w-sm leading-relaxed">
              Trufas artesanais feitas com carinho,
              recheios cremosos e sabores irresistíveis
              para deixar qualquer momento mais doce.
            </p>
          </div>

          {/* NAVEGAÇÃO */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Navegação
            </h3>

            <nav className="flex flex-col gap-3 text-sm">
              <a
                href="#inicio"
                className="text-amber-100/70 hover:text-amber-300 transition"
              >
                Início
              </a>

              <a
                href="#trufas"
                className="text-amber-100/70 hover:text-amber-300 transition"
              >
                Nossas trufas
              </a>

              <a
                href="#assistente"
                className="text-amber-100/70 hover:text-amber-300 transition"
              >
                Assistente IA
              </a>

              <a
                href="#checkout"
                className="text-amber-100/70 hover:text-amber-300 transition"
              >
                Fazer pedido
              </a>
            </nav>
          </div>

          {/* CONTATO */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Encontre a Trufa Store
            </h3>

            <div className="space-y-4">

              <a
                href="https://www.instagram.com/trufastore.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-amber-950 transition font-bold">
                  IG
                </div>

                <div>
                  <p className="text-xs text-amber-200/60">
                    Instagram
                  </p>

                  <p className="font-semibold group-hover:text-amber-300 transition">
                    @trufastore.pe
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs text-amber-200/60">
                    Localização
                  </p>

                  <p className="font-semibold">
                    Pernambuco
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* LINHA FINAL */}
        <div className="border-t border-amber-800/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-amber-100/50">

          <p>
            © 2026 Trufa Store. Todos os direitos reservados.
          </p>

          <p>
            Feito com 🤎 e muitas trufas.
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer