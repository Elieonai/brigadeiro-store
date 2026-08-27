import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
} from 'lucide-react'

function Cart({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  if (!isOpen) {
    return null
  }

  // Quantidade total de trufas no carrinho
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  // Valor sem promoção
  const originalTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // PROMOÇÃO:
  // Cada grupo de 4 trufas custa R$ 10
  // As unidades restantes custam R$ 3 cada
  const combos = Math.floor(totalQuantity / 4)
  const remainingTruffles = totalQuantity % 4

  const total =
    combos * 10 + remainingTruffles * 3

  const discount = originalTotal - total

  function handleContinueOrder() {
    onClose()

    setTimeout(() => {
      document
        .getElementById('checkout')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 100)
  }

  return (
    <>
      {/* FUNDO ESCURECIDO */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* CARRINHO */}
      <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#F8E8C4] shadow-2xl flex flex-col">

        {/* CABEÇALHO */}
        <div className="bg-[#4A1C08] text-white px-5 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-amber-400 text-amber-950 rounded-xl flex items-center justify-center shadow-sm">
              <ShoppingBag size={21} />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Seu carrinho
              </h2>

              <p className="text-xs text-amber-200">
                {totalQuantity === 0
                  ? 'Nenhuma trufa'
                  : `${totalQuantity} ${
                      totalQuantity === 1
                        ? 'trufa'
                        : 'trufas'
                    }`}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition"
            aria-label="Fechar carrinho"
          >
            <X size={24} />
          </button>
        </div>

        {/* PROMOÇÃO */}
        {cart.length > 0 && (
          <div className="mx-4 sm:mx-5 mt-4 bg-amber-400 text-amber-950 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">

            <div className="w-9 h-9 bg-amber-950 text-amber-300 rounded-xl flex items-center justify-center shrink-0">
              <Tag size={18} />
            </div>

            <div>
              <p className="font-bold text-sm">
                Promoção Trufa Store
              </p>

              <p className="text-xs font-medium">
                1 por R$ 3,00 • Leve 4 por R$ 10,00
              </p>
            </div>

          </div>
        )}

        {/* ÁREA DOS PRODUTOS */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">

          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">

              <div className="w-16 h-16 rounded-2xl bg-[#4A1C08] text-amber-400 flex items-center justify-center mb-4 shadow-md">
                <ShoppingBag size={28} />
              </div>

              <h3 className="font-bold text-xl text-[#4A1C08] mb-2">
                Seu carrinho está vazio
              </h3>

              <p className="text-sm text-amber-950/60 max-w-xs">
                Escolha suas trufas favoritas e adicione ao
                carrinho para montar seu pedido.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 bg-amber-500 text-amber-950 font-bold px-5 py-3 rounded-xl hover:bg-amber-400 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                Ver trufas
              </button>

            </div>
          ) : (
            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-gradient-to-br
                    from-[#4A1C08]
                    to-[#261006]
                    border
                    border-amber-800/40
                    rounded-2xl
                    p-4
                    shadow-md
                    hover:shadow-xl
                    hover:-translate-y-0.5
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-20
                        h-20
                        sm:w-24
                        sm:h-24
                        object-cover
                        rounded-xl
                        shrink-0
                        border
                        border-amber-700/30
                      "
                    />

                    <div className="flex-1 min-w-0">

                      <div className="flex items-start justify-between gap-2">

                        <div>
                          <h3 className="font-bold text-amber-50 leading-tight">
                            {item.name}
                          </h3>

                          <p className="text-sm text-amber-100/60 mt-1">
                            {item.price.toLocaleString(
                              'pt-BR',
                              {
                                style: 'currency',
                                currency: 'BRL',
                              }
                            )}{' '}
                            cada
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onRemove(item.id)
                          }
                          className="
                            p-2
                            text-red-400
                            hover:text-red-300
                            hover:bg-red-500/10
                            rounded-lg
                            transition
                          "
                          aria-label={`Remover ${item.name}`}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                      <div className="flex items-center justify-between gap-3 mt-4">

                        <div
                          className="
                            flex
                            items-center
                            bg-white/10
                            border
                            border-amber-700/40
                            rounded-xl
                            p-1
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              onDecrease(item.id)
                            }
                            className="
                              w-8
                              h-8
                              flex
                              items-center
                              justify-center
                              rounded-lg
                              text-amber-100
                              hover:bg-white/10
                              transition
                            "
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-8 text-center font-bold text-white">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              onIncrease(item.id)
                            }
                            className="
                              w-8
                              h-8
                              flex
                              items-center
                              justify-center
                              rounded-lg
                              text-amber-100
                              hover:bg-white/10
                              transition
                            "
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* VALOR NORMAL DO SABOR */}
                        <div className="text-right">
                          <span className="block text-[11px] text-amber-100/50 mb-0.5">
                            Valor
                          </span>

                          <p className="font-bold text-amber-400 text-sm sm:text-base">
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString(
                              'pt-BR',
                              {
                                style: 'currency',
                                currency: 'BRL',
                              }
                            )}
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* RESUMO */}
        {cart.length > 0 && (
          <div className="border-t border-amber-800/30 bg-[#3B1708] p-5 sm:p-6 shadow-[0_-8px_25px_rgba(59,23,8,0.15)]">

            {/* VALOR SEM DESCONTO */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-amber-100/70">
                Subtotal
              </span>

              <span className="font-semibold text-amber-100">
                {originalTotal.toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  }
                )}
              </span>
            </div>

            {/* DESCONTO */}
            {discount > 0 && (
              <div className="flex items-center justify-between mb-3">

                <span className="flex items-center gap-2 text-green-400 font-semibold">
                  <Tag size={15} />
                  Promoção
                </span>

                <span className="font-bold text-green-400">
                  -{' '}
                  {discount.toLocaleString(
                    'pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    }
                  )}
                </span>

              </div>
            )}

            {/* COMBOS */}
            {combos > 0 && (
              <div className="bg-white/5 border border-amber-700/30 rounded-xl px-3 py-2 mb-4">
                <p className="text-xs text-amber-100/70">
                  🔥 {combos}{' '}
                  {combos === 1
                    ? 'combo aplicado'
                    : 'combos aplicados'}{' '}
                  de 4 trufas por R$ 10,00
                </p>
              </div>
            )}

            {/* TOTAL */}
            <div className="flex items-center justify-between pt-4 border-t border-dashed border-amber-700/50">

              <span className="text-lg font-bold text-amber-50">
                Total
              </span>

              <span className="text-2xl font-bold text-amber-400">
                {total.toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  }
                )}
              </span>

            </div>

            <button
              type="button"
              onClick={handleContinueOrder}
              className="
                mt-5
                w-full
                bg-amber-500
                text-amber-950
                font-bold
                py-3.5
                rounded-xl
                hover:bg-amber-400
                hover:-translate-y-0.5
                active:scale-[0.99]
                transition-all
                shadow-lg
                shadow-black/10
              "
            >
              Continuar pedido →
            </button>

            <p className="text-center text-xs text-amber-100/50 mt-3">
              Você poderá revisar seu pedido antes de finalizar.
            </p>

          </div>
        )}

      </aside>
    </>
  )
}

export default Cart