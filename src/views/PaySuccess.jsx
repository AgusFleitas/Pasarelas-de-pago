import success from '../img/success.webp'

const PaySuccess = () => {
    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-8">Pago realizado correctamente</h1>
            <div className="border-2 border-emerald-700 rounded-md w-96 flex flex-col justify-center items-center py-4 p-8 shadow-md shadow-slate-700">
                <strong className="text-2xl mb text-emerald-600">¡Felicidades!</strong>
                <p>Tu pago ha sido aprobado de forma exitosa.</p>
                <img className="my-6" src={success} alt="Ilustración del símbolo 'correcto' que representa el pago con éxito." />
                <a className="bg-emerald-700/70 rounded-md py-1 px-3 w-32 text-center font-semibold mb-2 hover:scale-105 transition-transform" href="#">Ver detalles</a>
                <a className="border-2 border-emerald-700/70 rounded-md py-1 px-3 w-32 text-center font-semibold hover:scale-105 transition-transform" href="/">Ir al inicio</a>
            </div>
        </section>
    )
}

export default PaySuccess