import { useState } from 'react'

function CustomerForm({ customer, setCustomer, onSubmit }) {
    const [errors, setErrors] = useState({})

    function validateForm() {
        const newErrors = {}

        if (!customer.name.trim()) {
            newErrors.name = 'Informe seu nome.'
        }

        if (!customer.phone.trim()) {
            newErrors.phone = 'Informe seu telefone.'
        }

        if (!customer.address.trim()) {
            newErrors.address = 'Informe seu endereço.'
        }

        if (!customer.payment) {
            newErrors.payment = 'Selecione uma forma de pagamento.'
        }

        setErrors(newErrors)

        const isValid = Object.keys(newErrors).length === 0

        if (isValid) {
            onSubmit()
        }

        return isValid
    }

    function handleChange(event) {
        const { name, value } = event.target

        setCustomer((currentCustomer) => ({
            ...currentCustomer,
            [name]: value,
        }))

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: '',
        }))
    }

    return (
        <section className="bg-white rounded-2xl border border-amber-100 p-6">
            <h2 className="text-2xl font-bold text-amber-950 mb-6">
                Dados do cliente
            </h2>

            <div className="space-y-5">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Nome
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={customer.name}
                        onChange={handleChange}
                        placeholder="Digite seu nome"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />

                    {errors.name && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Telefone
                    </label>

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={customer.phone}
                        onChange={handleChange}
                        placeholder="(81) 99999-9999"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />

                    {errors.phone && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Endereço
                    </label>

                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={customer.address}
                        onChange={handleChange}
                        placeholder="Rua, número e bairro"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />

                    {errors.address && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors.address}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="complement"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Complemento
                    </label>

                    <input
                        id="complement"
                        name="complement"
                        type="text"
                        value={customer.complement}
                        onChange={handleChange}
                        placeholder="Apartamento, bloco, referência..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="payment"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Forma de pagamento
                    </label>

                    <select
                        id="payment"
                        name="payment"
                        value={customer.payment}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    >
                        <option value="">Selecione</option>
                        <option value="Pix">Pix</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Cartão">Cartão</option>
                    </select>

                    {errors.payment && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors.payment}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={validateForm}
                    className="w-full bg-amber-500 text-amber-950 font-semibold py-3 rounded-xl hover:bg-amber-400 transition"
                >
                    Continuar
                </button>
            </div>
        </section>
    )
}

export default CustomerForm