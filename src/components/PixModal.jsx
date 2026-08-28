import { useState } from 'react'
import {
  X,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react'

function PixModal({
  isOpen,
  onClose,
  qrCode,
  pixPayload,
  amount,
  onContinue,
}) {
  const [copied, setCopied] =
    useState(false)

  if (!isOpen) {
    return null
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        pixPayload
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error(
        'Erro ao copiar Pix:',
        error
      )
    }
  }

  return (
    <>
      {/* FUNDO */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          fixed
          inset-0
          z-[110]
          flex
          items-center
          justify-center
          p-4
          pointer-events-none
        "
      >
        <div
          className="
            pointer-events-auto
            bg-white
            w-full
            max-w-md
            max-h-[95vh]
            overflow-y-auto
            rounded-3xl
            shadow-2xl
          "
        >
          {/* HEADER */}
          <div className="bg-[#4A1C08] text-white px-6 py-5 flex items-center justify-between">

            <div>
              <p className="text-xs text-amber-200 font-semibold">
                PAGAMENTO
              </p>

              <h2 className="text-2xl font-bold">
                Pague com Pix
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition"
            >
              <X size={23} />
            </button>

          </div>

          <div className="p-6">

            {/* VALOR */}
            <div className="text-center mb-5">

              <p className="text-sm text-gray-500">
                Total do pedido
              </p>

              <p className="text-4xl font-black text-amber-950 mt-1">
                {Number(amount).toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  }
                )}
              </p>

            </div>

            {/* QR CODE */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-5 flex justify-center">

              <img
                src={qrCode}
                alt="QR Code Pix"
                className="w-full max-w-[280px] rounded-xl"
              />

            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Abra o aplicativo do seu banco e
              escaneie o QR Code.
            </p>

            {/* DIVISOR */}
            <div className="flex items-center gap-3 my-5">

              <div className="h-px bg-gray-200 flex-1" />

              <span className="text-xs text-gray-400">
                ou
              </span>

              <div className="h-px bg-gray-200 flex-1" />

            </div>

            {/* PIX COPIA E COLA */}
            <div>

              <p className="font-semibold text-gray-700 mb-2">
                Pix Copia e Cola
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">

                <p className="text-xs text-gray-500 break-all line-clamp-3">
                  {pixPayload}
                </p>

              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="
                  mt-3
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-amber-300
                  text-amber-900
                  font-bold
                  py-3
                  rounded-xl
                  hover:bg-amber-50
                  transition
                "
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Código copiado!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copiar código Pix
                  </>
                )}
              </button>

            </div>

            {/* AVISO */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-5">

              <p className="text-xs text-amber-900 leading-relaxed">
                Após realizar o pagamento,
                continue para o WhatsApp e envie
                seu pedido. A confirmação do
                pagamento será feita pela loja.
              </p>

            </div>

            {/* WHATSAPP */}
            <button
              type="button"
              onClick={onContinue}
              className="
                mt-5
                w-full
                flex
                items-center
                justify-center
                gap-2
                bg-green-600
                text-white
                font-bold
                py-4
                rounded-xl
                hover:bg-green-500
                transition
                shadow-sm
              "
            >
              <MessageCircle size={20} />

              Continuar para WhatsApp
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default PixModal