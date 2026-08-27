import { useState } from 'react'
import {
  Sparkles,
  WandSparkles,
  MessageCircle,
} from 'lucide-react'

function AIRecommendation() {
  const [preference, setPreference] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const suggestions = [
    'Quero opções para uma festa.',
    'Prefiro sabores mais doces.',
    'Gosto de chocolate e não quero morango.',
  ]

  async function handleRecommendation() {
    if (!preference.trim()) {
      setError(
        'Conte um pouco sobre o que você procura.'
      )
      return
    }

    setError('')
    setRecommendation('')
    setIsLoading(true)

    try {
      const response = await fetch(
        '/api/recommendation',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            preference,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Erro ao gerar recomendação.'
        )
      }

      setRecommendation(
        data.recommendation
      )
    } catch (error) {
      console.error(
        'Erro ao consultar IA:',
        error
      )

      setError(
        'Não foi possível gerar uma recomendação. Tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="assistente"
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-amber-50
        via-orange-50
        to-rose-50
        py-24
      "
    >
      {/* DECORAÇÃO */}
      <div className="absolute -top-24 right-0 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />

      <div className="absolute -bottom-24 left-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* CABEÇALHO */}
        <div className="text-center max-w-2xl mx-auto mb-10">

          <span
            className="
              inline-flex
              items-center
              gap-2
              bg-white
              border
              border-amber-200
              text-amber-800
              font-semibold
              px-4
              py-2
              rounded-full
              shadow-sm
              mb-4
            "
          >
            <WandSparkles size={17} />

            Recomendação inteligente
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-amber-950 mb-4">
            Não sabe qual trufa escolher?
          </h2>

          <p className="text-gray-600 text-base sm:text-lg">
            Conte suas preferências e nosso
            assistente com IA sugere os sabores
            que mais combinam com você.
          </p>

        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">

          {/* FORMULÁRIO */}
          <div
            className="
              bg-white/90
              backdrop-blur
              border
              border-amber-100
              rounded-3xl
              p-6
              sm:p-8
              shadow-lg
            "
          >

            <div className="flex items-center gap-3 mb-5">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-amber-100
                  text-amber-700
                  flex
                  items-center
                  justify-center
                "
              >
                <MessageCircle size={21} />
              </div>

              <div>

                <h3 className="font-bold text-amber-950 text-lg">
                  Conte o que você procura
                </h3>

                <p className="text-sm text-gray-500">
                  Pode falar sobre sabores,
                  ocasião ou preferências.
                </p>

              </div>

            </div>

            {/* TEXTO DO CLIENTE */}
            <textarea
              value={preference}
              onChange={(event) => {
                setPreference(
                  event.target.value
                )

                setError('')
              }}
              placeholder="Ex: Quero trufas para uma festa e prefiro sabores de chocolate."
              rows={5}
              className="
                w-full
                border
                border-gray-200
                bg-amber-50/40
                rounded-2xl
                px-4
                py-4
                outline-none
                resize-none
                focus:border-amber-500
                focus:ring-4
                focus:ring-amber-100
                transition
              "
            />

            {/* SUGESTÕES */}
            <div className="flex flex-wrap gap-2 mt-4">

              {suggestions.map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setPreference(
                        suggestion
                      )

                      setError('')
                    }}
                    className="
                      text-sm
                      px-3
                      py-2
                      rounded-full
                      bg-amber-50
                      border
                      border-amber-200
                      text-amber-800
                      hover:bg-amber-100
                      transition
                    "
                  >
                    {suggestion}
                  </button>
                )
              )}

            </div>

            {/* ERRO */}
            {error && (
              <p className="text-sm text-red-600 mt-3">
                {error}
              </p>
            )}

            {/* BOTÃO */}
            <button
              type="button"
              onClick={
                handleRecommendation
              }
              disabled={isLoading}
              className="
                mt-6
                w-full
                sm:w-auto
                flex
                items-center
                justify-center
                gap-2
                bg-amber-500
                text-amber-950
                font-bold
                px-6
                py-3.5
                rounded-xl
                hover:bg-amber-400
                hover:-translate-y-0.5
                transition
                shadow-sm
                disabled:opacity-50
                disabled:hover:translate-y-0
              "
            >
              <Sparkles size={18} />

              {isLoading
                ? 'Pensando na melhor opção...'
                : 'Pedir recomendação'}
            </button>

          </div>

          {/* RESPOSTA DA IA */}
          <div
            className="
              bg-amber-950
              text-white
              rounded-3xl
              p-6
              sm:p-8
              shadow-lg
              flex
              flex-col
              justify-between
              min-h-[320px]
            "
          >

            <div>

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-amber-400
                  text-amber-950
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <Sparkles size={22} />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Sua recomendação
              </h3>

              <p className="text-amber-100/80 text-sm mb-6">
                A resposta aparecerá aqui com
                sugestões baseadas nas suas
                preferências.
              </p>

              {recommendation ? (
                <div
                  className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >
                  <p className="text-amber-50 whitespace-pre-line leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              ) : (
                <div
                  className="
                    border
                    border-dashed
                    border-amber-700
                    rounded-2xl
                    p-5
                    text-amber-200/70
                    text-sm
                  "
                >
                  Exemplo: “Chocolate e
                  Maracujá combinam bem para
                  quem quer equilibrar um sabor
                  intenso com um toque mais
                  fresco.”
                </div>
              )}

            </div>

            <p className="text-xs text-amber-200/60 mt-6">
              ✨ A IA recomenda apenas sabores
              disponíveis na Trufa Store.
            </p>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AIRecommendation