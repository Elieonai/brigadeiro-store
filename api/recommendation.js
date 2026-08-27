import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export default async function handler(req, res) {
  // Aceitar somente POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido.',
    })
  }

  try {
    const { preference } = req.body || {}

    if (!preference?.trim()) {
      return res.status(400).json({
        error: 'Informe suas preferências.',
      })
    }

    const prompt = `
Você é o assistente da Trufa Store.

Sua função é ajudar o cliente a escolher as melhores trufas de acordo
com suas preferências e ocasião.

A loja possui SOMENTE estes sabores:

- Trufa de Chocolate
- Trufa de Ninho
- Trufa de Morango
- Trufa de Maracujá

Regras:
- Recomende apenas trufas dessa lista.
- Nunca invente sabores que não existem na loja.
- Considere as preferências informadas pelo cliente.
- Se o cliente disser que não gosta de determinado sabor, não o recomende.
- Responda em português do Brasil.
- Seja breve, amigável e objetivo.
- Explique em poucas frases por que escolheu as trufas.
- Não invente preços.
- Não invente promoções.
- Não invente ingredientes que não foram informados.

Preferência do cliente:
${preference}
`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    return res.status(200).json({
      recommendation: response.text,
    })
  } catch (error) {
    console.error(
      'Erro ao consultar Gemini:',
      error
    )

    return res.status(500).json({
      error:
        'Não foi possível gerar a recomendação.',
    })
  }
}