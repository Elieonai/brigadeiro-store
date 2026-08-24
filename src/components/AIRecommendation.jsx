import { useState } from 'react'
import { Sparkles } from 'lucide-react'

function AIRecommendation() {
  const [preference, setPreference] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleRecommendation() {
    if (!preference.trim()) {
      setError('Conte um pouco sobre o que você procura.')
      return
    }

    setError('')
    setRecommendation('')
    setIsLoading(true)

    try {
      const response = await fetch(
        'http://localhost:3001/api/recommendation',
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
          data.error || 'Erro ao gerar recomendação.'
        )
      }

      setRecommendation(data.recommendation)
    } catch (error) {
      console.error('Erro ao consultar IA:', error)

      setError(
        'Não foi possível gerar uma recomendação. Tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-amber-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-amber-100 rounded-3xl p-6 sm:p-8 shadow-sm">

          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-amber-500" />

            <h2 className="text-2xl sm:text-3xl font-bold text-amber-950">
              Assistente de Brigadeiros
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            Conte o que você procura e nossa IA ajuda você
            a escolher os brigadeiros ideais.
          </p>

          <textarea
            value={preference}
            onChange={(event) => {
              setPreference(event.target.value)
              setError('')
            }}
            placeholder="Ex: Quero brigadeiros para uma festa de 15 pessoas e prefiro sabores de chocolate."
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-amber-500"
          />

          {error && (
            <p className="text-sm text-red-600 mt-2">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleRecommendation}
            disabled={isLoading}
            className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 text-amber-950 font-semibold px-6 py-3 rounded-xl hover:bg-amber-400 transition disabled:opacity-50"
          >
            <Sparkles size={18} />

            {isLoading
              ? 'Pensando...'
              : 'Pedir recomendação'}
          </button>

          {recommendation && (
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-5">
              <p className="font-semibold text-amber-950 mb-2">
                ✨ Recomendação
              </p>

              <p className="text-gray-700">
                {recommendation}
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default AIRecommendation