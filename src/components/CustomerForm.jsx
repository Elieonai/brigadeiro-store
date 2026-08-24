import { useState } from 'react'

function CustomerForm({ customer, setCustomer, onSubmit }) {
    const [errors, setErrors] = useState({})
    const [isLoadingCep, setIsLoadingCep] = useState(false)

    function validateForm() {
        const newErrors = {}

        if (!customer.name.trim()) {
            newErrors.name = 'Informe seu nome.'
        }

        if (!customer.phone.trim()) {
            newErrors.phone = 'Informe seu telefone.'
        }

        if (!customer.cep.trim()) {
            newErrors.cep = 'Informe seu CEP.'
        }

        if (!customer.address.trim()) {
            newErrors.address = 'Informe seu endereço.'
        }

        if (!customer.number.trim()) {
            newErrors.number = 'Informe o número.'
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

        let formattedValue = value

        if (name === 'cep') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/^(\d{5})(\d)/, '$1-$2')
                .slice(0, 9)
        }

        setCustomer((currentCustomer) => ({
            ...currentCustomer,
            [name]: formattedValue,
        }))

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: '',
        }))
    }

    async function handleCepBlur() {
        const cep = customer.cep.replace(/\D/g, '')

        if (cep.length !== 8) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                cep: 'CEP inválido. Digite 8 números.',
            }))

            return
        }

        try {
            setIsLoadingCep(true)

            const response = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            )

            if (!response.ok) {
                throw new Error('Erro ao consultar CEP')
            }

            const data = await response.json()

            if (data.erro) {
                setErrors((currentErrors) => ({
                    ...currentErrors,
                    cep: 'CEP não encontrado.',
                }))

                return
            }

            setCustomer((currentCustomer) => ({
                ...currentCustomer,
                address: data.logradouro || '',
                neighborhood: data.bairro || '',
                city: data.localidade || '',
                state: data.uf || '',
            }))

            setErrors((currentErrors) => ({
                ...currentErrors,
                cep: '',
            }))
        } catch (error) {
            console.error(error)

            setErrors((currentErrors) => ({
                ...currentErrors,
                cep: 'Não foi possível consultar o CEP.',
            }))
        } finally {
            setIsLoadingCep(false)
        }
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
                        htmlFor="cep"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        CEP
                    </label>

                    <input
                        id="cep"
                        name="cep"
                        type="text"
                        value={customer.cep}
                        onChange={handleChange}
                        onBlur={handleCepBlur}
                        placeholder="00000-000"
                        maxLength={9}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />

                    {isLoadingCep && (
                        <p className="text-sm text-amber-700 mt-2">
                            Buscando endereço...
                        </p>
                    )}

                    {errors.cep && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors.cep}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Rua
                    </label>

                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={customer.address}
                        onChange={handleChange}
                        placeholder="Rua"
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
                        htmlFor="number"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Número
                    </label>

                    <input
                        id="number"
                        name="number"
                        type="text"
                        value={customer.number}
                        onChange={handleChange}
                        placeholder="Número"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />

                    {errors.number && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors.number}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="neighborhood"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Bairro
                    </label>

                    <input
                        id="neighborhood"
                        name="neighborhood"
                        type="text"
                        value={customer.neighborhood}
                        onChange={handleChange}
                        placeholder="Bairro"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Cidade
                        </label>

                        <input
                            id="city"
                            name="city"
                            type="text"
                            value={customer.city}
                            onChange={handleChange}
                            placeholder="Cidade"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="state"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Estado
                        </label>

                        <input
                            id="state"
                            name="state"
                            type="text"
                            value={customer.state}
                            onChange={handleChange}
                            placeholder="UF"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-amber-500"
                        />
                    </div>
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