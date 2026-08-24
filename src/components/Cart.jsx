import { X, Minus, Plus, Trash2 } from 'lucide-react'

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

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      <aside className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-amber-950">
            Seu carrinho
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500">
            Seu carrinho está vazio.
          </p>
        ) : (
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b pb-5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-amber-950">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => onDecrease(item.id)}
                      className="p-1 border rounded"
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => onIncrease(item.id)}
                      className="p-1 border rounded"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="ml-auto text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  )
}

export default Cart