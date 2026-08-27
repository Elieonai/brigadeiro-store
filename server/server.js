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

    res.json({
      recommendation: response.text,
    })
  } catch (error) {
    console.error('Erro ao consultar Gemini:', error)

    res.status(500).json({
      error: 'Não foi possível gerar a recomendação.',
    })
  }
})

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001')
})