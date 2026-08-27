import { useState } from 'react'

function CustomerForm({ onSubmit }) {
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        cep: '',
        address: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
        payment: '',
    })

    const [errors, setErrors] = useState({})
    const [isLoadingCep, setIsLoadingCep] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target

        let newValue = value

        if (name === 'cep') {
            const numbers = value.replace(/\D/g, '').slice(0, 8)

            newValue = numbers.replace(
                /^(\d{5})(\d)/,
                '$1-$2'
            )
        }

        setCustomer((currentCustomer) => ({
            ...currentCustomer,
            [name]: newValue,
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
                cep: 'Informe um CEP válido.',
            }))

            return
        }

        try {
            setIsLoadingCep(true)

            setErrors((currentErrors) => ({
                ...currentErrors,
                cep: '',
            }))

            const response = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            )

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
        } catch (error) {
            console.error('Erro ao consultar CEP:', error)

            setErrors((currentErrors) => ({
                ...currentErrors,
                cep: 'Não foi possível consultar o CEP.',
            }))
        } finally {
            setIsLoadingCep(false)
        }
    }

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
            newErrors.payment = 'Selecione a forma de pagamento.'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            onSubmit(customer)
        }
    }

    return (
        <section
            id="checkout"
            className="scroll-mt-28 bg-gradient-to-br from-white to-amber-50/50 rounded-3xl border border-amber-100 p-6 sm:p-8 shadow-sm"
        >

            {/* CABEÇALHO */}
            <div className="mb-8">
                <span className="inline-flex items-center bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1.5 rounded-full mb-3">
                    🛍️ Finalizar pedido
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-amber-950">
                    Dados do cliente
                </h2>

                <p className="text-gray-500 mt-2">
                    Preencha seus dados para continuar com o pedido.
                </p>
            </div>

            <div className="space-y-8">

                {/* DADOS PESSOAIS */}
                <div>
                    <h3 className="font-bold text-amber-950 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-lg">
                            👤
                        </span>
                        Informações pessoais
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">

                        {/* NOME */}
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />

                            {errors.name && (
                                <p className="text-sm text-red-600 mt-2">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* TELEFONE */}
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />

                            {errors.phone && (
                                <p className="text-sm text-red-600 mt-2">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ENDEREÇO */}
                <div className="border-t border-amber-100 pt-7">

                    <h3 className="font-bold text-amber-950 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-lg">
                            📍
                        </span>
                        Endereço de entrega
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">

                        {/* CEP */}
                        <div className="md:col-span-2">
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
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

                        {/* NÚMERO */}
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />

                            {errors.number && (
                                <p className="text-sm text-red-600 mt-2">
                                    {errors.number}
                                </p>
                            )}
                        </div>

                        {/* RUA */}
                        <div className="md:col-span-3">
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />

                            {errors.address && (
                                <p className="text-sm text-red-600 mt-2">
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        {/* BAIRRO */}
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />
                        </div>

                        {/* COMPLEMENTO */}
                        <div className="md:col-span-2">
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />
                        </div>

                        {/* CIDADE */}
                        <div className="md:col-span-2">
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
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />
                        </div>

                        {/* ESTADO */}
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
                                maxLength={2}
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                            />
                        </div>
                    </div>
                </div>

                {/* PAGAMENTO */}
                <div className="border-t border-amber-100 pt-7">

                    <h3 className="font-bold text-amber-950 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-lg">
                            💳
                        </span>
                        Pagamento
                    </h3>

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
                        className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition"
                    >
                        <option value="">
                            Selecione uma opção
                        </option>

                        <option value="Pix">
                            Pix
                        </option>

                        <option value="Dinheiro">
                            Dinheiro
                        </option>

                        <option value="Cartão">
                            Cartão
                        </option>
                    </select>

                    {errors.payment && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors.payment}
                        </p>
                    )}
                </div>

                {/* BOTÃO */}
                <button
                    type="button"
                    onClick={validateForm}
                    className="w-full bg-amber-500 text-amber-950 font-bold py-4 rounded-xl hover:bg-amber-400 hover:-translate-y-0.5 transition shadow-sm"
                >
                    Continuar pedido →
                </button>

            </div>
        </section>
    )
}

export default CustomerForm