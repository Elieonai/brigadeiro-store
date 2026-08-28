import QRCode from 'qrcode'

function formatField(id, value) {
  const length = String(value.length).padStart(2, '0')

  return `${id}${length}${value}`
}

function removeAccents(text = '') {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function sanitizeName(value) {
  return removeAccents(value)
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .slice(0, 25)
}

function sanitizeCity(value) {
  return removeAccents(value)
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .slice(0, 15)
}

function crc16(payload) {
  let crc = 0xffff

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8

    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021
      } else {
        crc <<= 1
      }

      crc &= 0xffff
    }
  }

  return crc
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')
}

function generatePixPayload({
  key,
  name,
  city,
  amount,
}) {
  const merchantAccount =
    formatField('00', 'BR.GOV.BCB.PIX') +
    formatField('01', key)

  const additionalData =
    formatField('05', '***')

  let payload = ''

  // Payload Format Indicator
  payload += formatField('00', '01')

  // Point of Initiation Method
  // 11 = QR Code estático
  payload += formatField('01', '11')

  // Merchant Account Information
  payload += formatField(
    '26',
    merchantAccount
  )

  // Merchant Category Code
  payload += formatField('52', '0000')

  // Moeda BRL
  payload += formatField('53', '986')

  // Valor
  payload += formatField(
    '54',
    Number(amount).toFixed(2)
  )

  // País
  payload += formatField('58', 'BR')

  // Nome do recebedor
  payload += formatField(
    '59',
    sanitizeName(name)
  )

  // Cidade
  payload += formatField(
    '60',
    sanitizeCity(city)
  )

  // Dados adicionais
  payload += formatField(
    '62',
    additionalData
  )

  // Campo CRC
  payload += '6304'

  const crc = crc16(payload)

  return payload + crc
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método não permitido.',
    })
  }

  try {
    const pixKey = process.env.PIX_KEY
    const pixName = process.env.PIX_NAME
    const pixCity = process.env.PIX_CITY

    if (!pixKey || !pixName || !pixCity) {
      console.error(
        'Variáveis PIX não configuradas.'
      )

      return res.status(500).json({
        error:
          'Pagamento via Pix indisponível.',
      })
    }

    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body

    const totalQuantity =
      Number(body?.totalQuantity)

    if (
      !Number.isInteger(totalQuantity) ||
      totalQuantity <= 0
    ) {
      return res.status(400).json({
        error:
          'Quantidade de trufas inválida.',
      })
    }

    // MESMA PROMOÇÃO DO SITE
    // 4 trufas = R$ 10
    // restante = R$ 3 cada
    const combos =
      Math.floor(totalQuantity / 4)

    const remaining =
      totalQuantity % 4

    const amount =
      combos * 10 +
      remaining * 3

    const pixPayload =
      generatePixPayload({
        key: pixKey,
        name: pixName,
        city: pixCity,
        amount,
      })

    const qrCode = await QRCode.toDataURL(
      pixPayload,
      {
        width: 360,
        margin: 2,
      }
    )

    return res.status(200).json({
      qrCode,
      pixPayload,
      amount,
    })
  } catch (error) {
    console.error(
      'Erro ao gerar Pix:',
      error
    )

    return res.status(500).json({
      error:
        'Não foi possível gerar o pagamento via Pix.',
    })
  }
}