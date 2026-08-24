import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.post('/api/recommendation', async (req, res) => {
  try {
    const { preference } = req.body

    if (!preference?.trim()) {
      return res.status(400).json({
        error: 'Informe suas preferências.',
      })
    }

    const prompt = `
Você é o assistente da Brigadeiro Store.

A loja possui SOMENTE estes sabores:
- Brigadeiro Tradicional
- Brigadeiro de Ninho
- Brigadeiro de Morango
- Brigadeiro de Pistache

Regras:
- Recomende apenas sabores dessa lista.
- Responda em português do Brasil.
- Seja breve e amigável.
- Explique por que escolheu os sabores.
- Não invente preços, ingredientes ou promoções.

Preferência do cliente:
${preference}
`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    res.json({
      recommendation: response.text,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Não foi possível gerar a recomendação.',
    })
  }
})

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001')
})